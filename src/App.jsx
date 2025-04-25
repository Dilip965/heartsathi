import Home from "./pages/Home/home"
import Navbar from "./component/Navbar/Nav";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from "./component/Footer";
import AboutUs  from "./pages/About";
import NotFoundPage from "./pages/Notfound";
import FloatingButtons from "./component/whatsappflotating";
import ChatApp from "./pages/videocall";
import Knowledge from "./pages/knowledge";
import Treatment from "./pages/treatmennt/index";
function App(){
return(

  <>
  
  <Router>
  <Navbar/>
    
      <Routes>
       
        <Route path="/" element={<Home />} /> 
        <Route path="/about" element={<AboutUs />} />
        <Route path="/chat" element={<ChatApp />} /> 
        <Route path="/knowledge" element={<Knowledge />} /> 
        <Route path="/treatment" element={<Treatment/>}/>
        
        <Route path="*" element={<NotFoundPage />} />


      </Routes>
    <FloatingButtons/>
      <Footer/>
    </Router>

  </>
)

}

export default App