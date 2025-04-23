import Home from "./pages/Home/home"
import Navbar from "./component/Navbar/Nav";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from "./component/Footer";
function App(){
return(

  <>
  
  <Router>
  <Navbar/>
    
      <Routes>
       
        <Route path="/" element={<Home />} />  


      </Routes>
      <Footer/>
    </Router>

  </>
)

}

export default App