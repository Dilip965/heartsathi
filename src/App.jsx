import Home from "./pages/Home/home"
import Navbar from "./component/Navbar/Nav";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from "./component/Footer";
import AboutUs  from "./pages/About";
import NotFoundPage from "./pages/Notfound";

function App(){
return(

  <>
  
  <Router>
  <Navbar/>
    
      <Routes>
       
        <Route path="/" element={<Home />} /> 
        <Route path="/about" element={<AboutUs />} /> 
        <Route path="*" element={<NotFoundPage />} />


      </Routes>
      <Footer/>
    </Router>

  </>
)

}

export default App