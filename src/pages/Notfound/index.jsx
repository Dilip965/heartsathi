import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HeartPulse } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-900 px-6">
      <motion.div 
        initial={{ scale: 0.5 }} 
        animate={{ scale: 1 }} 
        transition={{ type: "spring", stiffness: 100 }}
        className="text-center"
      >
        <HeartPulse size={80} className="text-red-500 animate-pulse mx-auto mb-4" />
        <h1 className="text-5xl font-bold mb-2">Oops! Page Not Found</h1>
        <p className="text-lg max-w-md mx-auto text-gray-700 mb-6">
          We couldn’t find the page you were looking for, but your heart health journey is still on track. 💖
        </p>
        <Link 
          to="/" 
          className="px-5 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
        >
          Go to Homepage
        </Link>
      </motion.div>
    </div>
  );
}
