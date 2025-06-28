import React, {useState} from 'react'
import {
BrowserRouter as Router,
Routes,
Route
}from "react-router-dom";
import Navbar from "./Components/Navbar";
import TextForm from "./Components/TextForm";
import About from "./Components/About";
import Footer from './Components/Footer';
import Alert from './Components/Alert';

function App() {
  // for mode change
  const [mode, setMode] = useState("light")
const toggle = ()=>{
  if (mode === "light"){
    setMode("dark")
    document.body.style.backgroundColor = "#222831";
    document.body.style.color = "#FFFFFF"
    showAlert(" Dark mode enabled", "Success")
    
  }else{
    setMode("light")
    document.body.style.backgroundColor = "white"
    document.body.style.color = "#222831"
    showAlert(" light mode enabled", "Success")
  }
}   
// for alert state
const [alert, setAlert]= useState(null);
const showAlert = (message, type)=>{
setAlert({
  message: message,
  type: type
})
setTimeout(()=>{
  setAlert(null)
}, 1500)
}
  return (
   <>
<Router>
 <Navbar mode={mode} toggle = {toggle} />
   
<div className="container">
 <Alert alert={alert}/>
 <Routes>
  <Route path='/' element={ <TextForm showAlert={showAlert} heading="Enter you text here" mode={mode}/>
}/>
 <Route path='/about' element={<About mode={mode}/>}/>
 </Routes>

 </div>
 </Router>
 <Footer mode={mode}/>
   </>
  );
}

export default App;
