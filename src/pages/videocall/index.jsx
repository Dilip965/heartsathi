import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

// Using the remote server URL instead of localhost
const SERVER_URL = 'https://mental-health-prediction-video-call.onrender.com';
// const SERVER_URL = 'http://localhost:5000';

export default function VideoCall() {
  const [socket, setSocket] = useState(null);
  const [stream, setStream] = useState(null);
  const [userName, setUserName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [peers, setPeers] = useState({});
  const [isJoined, setIsJoined] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [error, setError] = useState('');
  const [isInitializing, setIsInitializing] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  
  const userVideo = useRef(null);
  const peersRef = useRef({});
  const streamRef = useRef();
  // Adding state tracking for each peer connection
  const peerStates = useRef({});

  // Enhanced ICE servers configuration with TURN servers
  const iceServers = [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    // Public TURN servers for better NAT traversal
    {
      urls: 'turn:openrelay.metered.ca:80',
      username: 'openrelayproject',
      credential: 'openrelayproject'
    },
    {
      urls: 'turn:openrelay.metered.ca:443',
      username: 'openrelayproject',
      credential: 'openrelayproject'
    }
  ];

  // Handle setting up the video stream when component mounts and userVideo ref is available
  useEffect(() => {
    if (stream && userVideo.current) {
      userVideo.current.srcObject = stream;
    }
  }, [stream, userVideo.current]);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(SERVER_URL, {
      withCredentials: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
      transports: ['websocket', 'polling'] // Try websocket first, fallback to polling
    });
    
    // Add socket event listeners for connection status
    newSocket.on('connect', () => {
      console.log('Socket connected successfully');
      setConnectionStatus('connected');
      setError('');
    });
    
    newSocket.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
      setConnectionStatus('error');
      setError(`Connection error: ${err.message}`);
    });
    
    newSocket.on('connect_timeout', () => {
      console.error('Socket connection timeout');
      setConnectionStatus('timeout');
      setError('Connection timeout - please try again');
    });
    
    newSocket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      setConnectionStatus('disconnected');
      if (reason === 'io server disconnect') {
        setError('You were disconnected by the server');
      } else {
        setError('Disconnected from server - trying to reconnect...');
      }
    });
    
    setSocket(newSocket);

    return () => {
      // Clean up media tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      // Destroy all peer connections
      Object.values(peersRef.current).forEach(({ peer }) => {
        if (peer) {
          peer.destroy();
        }
      });
      
      // Disconnect socket
      newSocket.disconnect();
    };
  }, []);

  // Handle socket events for existing users and new joiners only when joined and stream is available
  useEffect(() => {
    if (!socket || !stream || !isJoined) return;

    // Handle existing users in the room
    socket.on('room-users', (users) => {
      console.log('Existing users in room:', users);
      
      // Clean up any existing peers first
      Object.values(peersRef.current).forEach(({ peer }) => {
        if (peer) {
          peer.destroy();
        }
      });
      
      peersRef.current = {};
      peerStates.current = {}; // Reset peer states
      setPeers({});
      
      // Create peer connections with all existing users
      users.forEach(({ userId, userName: remoteUserName }) => {
        console.log(`Creating peer for existing user: ${remoteUserName} (${userId})`);
        const peer = createPeer(userId, socket.id, stream);
        peersRef.current[userId] = { peer, userName: remoteUserName };
        peerStates.current[userId] = { hasOffer: true, hasAnswer: false };
      });
      
      setPeers(peersRef.current);
    });

    // Handle new user joining
    socket.on('user-joined', ({ userId, userName: remoteUserName }) => {
      console.log('User joined:', remoteUserName, userId);
      // Only create a peer if we don't already have one for this user
      if (!peersRef.current[userId]) {
        console.log(`Creating peer for new user: ${remoteUserName} (${userId})`);
        const peer = createPeer(userId, socket.id, stream);
        peersRef.current[userId] = { peer, userName: remoteUserName };
        peerStates.current[userId] = { hasOffer: true, hasAnswer: false };
        setPeers(prev => ({
          ...prev,
          [userId]: { peer, userName: remoteUserName }
        }));
      }
    });

    // Handle incoming call
    socket.on('incoming-call', ({ signal, from, name }) => {
      console.log('Incoming call from:', name, from);
      
      // If we already have a connection with this peer, destroy it
      if (peersRef.current[from]) {
        console.log(`Destroying existing peer for: ${name} (${from})`);
        if (peersRef.current[from].peer) {
          peersRef.current[from].peer.destroy();
        }
      }
      
      // Create a new peer connection
      console.log(`Adding peer for incoming call: ${name} (${from})`);
      const peer = addPeer(signal, from, stream);
      peersRef.current[from] = { peer, userName: name };
      peerStates.current[from] = { hasOffer: true, hasAnswer: true };
      setPeers(prev => ({
        ...prev,
        [from]: { peer, userName: name }
      }));
    });

    // Handle accepted call
    socket.on('call-accepted', ({ signal, to: from }) => {
      console.log('Call accepted from:', from);
      
      if (!peersRef.current[from] || !peersRef.current[from].peer) {
        console.warn(`Received call-accepted from ${from} but no peer exists`);
        return;
      }
      
      // Check if we're in the right state to receive an answer
      if (!peerStates.current[from] || !peerStates.current[from].hasOffer) {
        console.warn(`Received answer from ${from} but no offer was sent`);
        return;
      }
      
      // Check if we've already processed an answer for this peer
      if (peerStates.current[from].hasAnswer) {
        console.warn(`Already received an answer from ${from}, ignoring duplicate`);
        return;
      }
      
      try {
        console.log(`Signaling peer: ${from}`);
        peersRef.current[from].peer.signal(signal);
        peerStates.current[from].hasAnswer = true;
      } catch (err) {
        console.error('Error signaling peer:', err);
        
        // Only recreate the peer if it's a fatal error
        if (err.message.includes('InvalidStateError') || err.name === 'InvalidStateError') {
          console.log('State error occurred, ignoring duplicate signal');
        } else {
          // For other errors, recreate the peer
          console.log(`Recreating peer after error: ${from}`);
          if (peersRef.current[from]) {
            peersRef.current[from].peer.destroy();
            const peer = createPeer(from, socket.id, stream);
            const userName = peersRef.current[from].userName;
            peersRef.current[from] = { peer, userName };
            peerStates.current[from] = { hasOffer: true, hasAnswer: false };
            setPeers(prev => ({
              ...prev,
              [from]: { peer, userName }
            }));
          }
        }
      }
    });

    // Handle user leaving
    socket.on('user-left', userId => {
      console.log('User left:', userId);
      if (peersRef.current[userId]) {
        peersRef.current[userId].peer.destroy();
        delete peersRef.current[userId];
        delete peerStates.current[userId];
        setPeers(prev => {
          const newPeers = { ...prev };
          delete newPeers[userId];
          return newPeers;
        });
      }
    });

    // Handle errors
    socket.on('error-message', ({ message }) => {
      console.error('Socket error:', message);
      setError(`Server error: ${message}`);
    });

    return () => {
      socket.off('room-users');
      socket.off('user-joined');
      socket.off('incoming-call');
      socket.off('call-accepted');
      socket.off('user-left');
      socket.off('error-message');
    };
  }, [socket, stream, isJoined]);

  const createPeer = (target, caller, stream) => {
    try {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream,
        config: {
          iceServers
        }
      });

      peer.on('signal', signal => {
        console.log(`Signaling to: ${target}`);
        socket.emit('call-user', {
          userToCall: target,
          signalData: signal,
          from: caller,
          name: userName
        });
      });

      peer.on('connect', () => {
        console.log(`Peer connected to: ${target}`);
      });

      peer.on('error', err => {
        console.error(`Peer error with ${target}:`, err);
      });

      peer.on('close', () => {
        console.log(`Peer connection closed with: ${target}`);
      });

      return peer;
    } catch (err) {
      console.error('Error creating peer:', err);
      return null;
    }
  };

  const addPeer = (incomingSignal, caller, stream) => {
    try {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream,
        config: {
          iceServers
        }
      });

      peer.on('signal', signal => {
        console.log(`Answering call to: ${caller}`);
        socket.emit('answer-call', { signal, to: caller });
      });

      peer.on('connect', () => {
        console.log(`Peer connection established with: ${caller}`);
      });

      peer.on('error', err => {
        console.error(`Peer error with ${caller}:`, err);
      });

      peer.on('close', () => {
        console.log(`Peer connection closed with: ${caller}`);
      });

      // Wrap in a try-catch to handle potential errors
      try {
        console.log(`Signaling with incoming data from: ${caller}`);
        peer.signal(incomingSignal);
      } catch (err) {
        console.error('Error signaling incoming peer:', err);
      }

      return peer;
    } catch (err) {
      console.error('Error adding peer:', err);
      return null;
    }
  };

  const joinRoom = async () => {
    if (!userName.trim() || !roomId.trim() || !socket) {
      setError('Please enter your name and room ID');
      return;
    }

    if (isInitializing) return;
    
    try {
      setError('');
      setIsInitializing(true);
      
      // Try first with ideal constraints for good quality
      const constraints = {
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        },
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user"
        }
      };
      
      let mediaStream;
      
      try {
        console.log('Requesting media with ideal constraints');
        mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (err) {
        console.error('Error with ideal constraints:', err);
        
        // First fallback - try with simpler video constraints
        try {
          console.log('Falling back to simple video constraints');
          mediaStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
          });
        } catch (err2) {
          console.error('Error with simple constraints:', err2);
          
          // Second fallback - try audio only if video fails completely
          console.log('Falling back to audio only');
          mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: true
          });
          setIsVideoOff(true);
        }
      }
      
      console.log('Got media stream:', mediaStream.getTracks().map(t => `${t.kind} (${t.enabled ? 'enabled' : 'disabled'})`).join(', '));
      streamRef.current = mediaStream;
      setStream(mediaStream);
      
      // Reset any existing peer connections before joining
      Object.values(peersRef.current).forEach(({ peer }) => {
        if (peer) peer.destroy();
      });
      peersRef.current = {};
      peerStates.current = {};
      setPeers({});
      
      console.log(`Joining room: ${roomId} as ${userName}`);
      socket.emit('join-room', { userName, roomId });
      setIsJoined(true);
    } catch (err) {
      console.error('Error accessing media devices:', err);
      setError(err.name === 'NotAllowedError' 
        ? 'Please allow camera and microphone access'
        : `Error accessing camera or microphone: ${err.message}`);
    } finally {
      setIsInitializing(false);
    }
  };

  const toggleMute = () => {
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks();
      if (audioTracks.length > 0) {
        const audioTrack = audioTracks[0];
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTracks = streamRef.current.getVideoTracks();
      if (videoTracks.length > 0) {
        const videoTrack = videoTracks[0];
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOff(!videoTrack.enabled);
      }
    }
  };

  const leaveRoom = () => {
    if (socket) {
      socket.emit('leave-room');
    }
    
    // Stop all tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setStream(null);
    }
    
    // Destroy all peer connections
    Object.values(peersRef.current).forEach(({ peer }) => {
      if (peer) peer.destroy();
    });
    peersRef.current = {};
    peerStates.current = {};
    setPeers({});
    
    setIsJoined(false);
  };

  // Restart all connections - useful when connections aren't working
  const restartConnections = () => {
    if (!socket || !streamRef.current) return;
    
    // Destroy all current peer connections
    Object.values(peersRef.current).forEach(({ peer }) => {
      if (peer) peer.destroy();
    });
    
    // Reset tracking objects
    peersRef.current = {};
    peerStates.current = {};
    setPeers({});
    
    // Request room users again to trigger new connections
    socket.emit('request-room-users', { roomId });
  };

  return (
    <div className="min-h-screen p-8 mt-12">
      {!isJoined ? (
        <div className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-lg">
          <h1 className="text-2xl font-bold text-purple-700 mb-6">Join Video Call</h1>
          
          {connectionStatus !== 'connected' && (
            <div className="mb-4 p-2 bg-yellow-100 text-yellow-800 rounded">
              Connection status: {connectionStatus}. {connectionStatus !== 'connected' && 'Waiting to connect...'}
            </div>
          )}
          
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <input
            type="text"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full mb-4 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full mb-4 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={joinRoom}
            disabled={!userName.trim() || !roomId.trim() || isInitializing || connectionStatus !== 'connected'}
            className="w-full bg-purple-700 text-white font-bold p-2 rounded hover:bg-purple-600 disabled:bg-gray-400"
          >
            {isInitializing ? 'Initializing...' : 'Join Room'}
          </button>
          
          <div className="mt-4 text-sm text-gray-600">
            <p>Tips:</p>
            <ul className="list-disc pl-5 mt-1">
              <li>Make sure you allow camera and microphone access</li>
              <li>Use the same Room ID on all devices to connect</li>
              <li>Try a different browser if you have connection issues</li>
              <li>Mobile users: Safari works best on iOS</li>
              <li>Make sure you're connected to the same network or have good internet</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Room: {roomId}</h2>
            <div className="text-sm text-gray-600">
              {Object.keys(peers).length} other participant(s)
            </div>
          </div>
          
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
              <button 
                onClick={restartConnections}
                className="ml-4 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
              >
                Restart Connections
              </button>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
              <video
                ref={userVideo}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${isVideoOff ? 'hidden' : ''}`}
              />
              {isVideoOff && (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <div className="text-white text-xl">Camera Off</div>
                </div>
              )}
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                {userName} (You)
              </div>
            </div>
            
            {Object.entries(peers).map(([peerId, { peer, userName: peerName }]) => {
              if (!peer) return null;
              
              return (
                <PeerVideo 
                  key={peerId} 
                  peer={peer} 
                  userName={peerName} 
                  peerId={peerId}
                />
              );
            })}
          </div>
          
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center space-x-2 space-y-2 md:space-y-0">
            <button
              onClick={toggleMute}
              className={`p-3 rounded-full ${
                isMuted ? 'bg-red-500' : 'bg-gray-700'
              } text-white hover:opacity-90`}
            >
              {isMuted ? 'Unmute' : 'Mute'}
            </button>
            <button
              onClick={toggleVideo}
              className={`p-3 rounded-full ${
                isVideoOff ? 'bg-red-500' : 'bg-gray-700'
              } text-white hover:opacity-90`}
            >
              {isVideoOff ? 'Start Video' : 'Stop Video'}
            </button>
            <button
              onClick={restartConnections}
              className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700"
            >
              Reconnect
            </button>
            <button
              onClick={leaveRoom}
              className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700"
            >
              Leave Room
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Improved PeerVideo component for better error handling
const PeerVideo = ({ peer, userName, peerId }) => {
  const videoRef = useRef();
  const [hasVideo, setHasVideo] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [errorState, setErrorState] = useState(null);

  useEffect(() => {
    if (!peer) return;

    console.log(`Setting up video for peer: ${userName} (${peerId})`);

    // Function to handle incoming stream
    const handleStream = (stream) => {
      console.log(`Received stream from: ${userName} (${peerId})`);

      // Check if the stream has video tracks
      const hasVideoTracks = stream.getVideoTracks().length > 0;
      setHasVideo(hasVideoTracks);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };

    // Add event listeners
    peer.on('stream', handleStream);

    peer.on('connect', () => {
      console.log(`Connected to peer: ${userName} (${peerId})`);
      setIsConnected(true);
      setErrorState(null);
    });

    peer.on('error', (err) => {
      console.error(`Error with peer ${userName} (${peerId}):`, err);
      setErrorState(err.message);
    });

    peer.on('close', () => {
      console.log(`Connection closed with peer: ${userName} (${peerId})`);
      setIsConnected(false);
    });

    // Check if stream is already available
    if (peer.streams && peer.streams[0]) {
      handleStream(peer.streams[0]);
    }

    return () => {
      // Clean up if needed
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [peer, userName, peerId]);

  return (
    <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className={`w-full h-full object-cover ${!hasVideo || !isConnected ? 'hidden' : ''}`}
      />
      {(!hasVideo || !isConnected) && (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800">
          <div className="text-white text-xl">
            {!isConnected ? 'Connecting...' : 'No Video'}
          </div>
          {errorState && (
            <div className="text-red-300 text-sm mt-2 px-4 text-center">
              {errorState}
            </div>
          )}
        </div>
      )}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
        {userName} {!isConnected && '(Connecting...)'}
      </div>
    </div>
  );
};