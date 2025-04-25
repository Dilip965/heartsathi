import Home from "./pages/Home/home"
import Navbar from "./component/Navbar/Nav";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from "./component/Footer";
import AboutUs  from "./pages/About";
import NotFoundPage from "./pages/Notfound";
import FloatingButtons from "./component/whatsappflotating";
import ChatApp from "./pages/videocall";
function App(){
return(

  <>
  
  <Router>
  <Navbar/>
    
      <Routes>
       
        <Route path="/" element={<Home />} /> 
        <Route path="/about" element={<AboutUs />} />
        <Route path="/chat" element={<ChatApp />} /> 
        <Route path="*" element={<NotFoundPage />} />


      </Routes>
    <FloatingButtons/>
      <Footer/>
    </Router>

  </>
)

}

export default App