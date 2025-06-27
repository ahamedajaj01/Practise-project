import React,{useState, useEffect} from 'react'

export default function TextForm(props){
    // using state to change event in button
    const [text, setText] = useState("")

    const handleOnChange = (e)=>{
        setText(e.target.value)
    };

  const handleUpClick = (e)=>{
e.preventDefault();
let newText = text.toUpperCase()
setText(newText)
props.showAlert("Text converted to uppercase", "Success")
  };
  const handleDownClick = (e)=>{
e.preventDefault();
let newText = text.toLowerCase()
setText(newText)
props.showAlert("Text converted to lowercase", "Success")

  };
const handleDelClick = (e)=>{
    e.preventDefault()
setText("")
props.showAlert("Text deleted successfully", "Success")

}
const handleSpeakClick = (e)=>{
    e.preventDefault()
    let speak = new SpeechSynthesisUtterance(text)
    speak.volume = 1;
    speak.rate = 1;
window.speechSynthesis.speak(speak)

}
const handleRevClick = (e)=>{
e.preventDefault();
let reverse = text.split("").reverse().join("")
setText(reverse)
props.showAlert("Text reversed", "Success")
}
// copy code to Clipboard
const handleCopyClick = (e) => {
  e.preventDefault();
  const textArea = document.getElementById("myTextArea");

  if (!textArea) return;

  // Select the text
  textArea.select();

  // Try using clipboard API first
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(textArea.value)
      .then(() => {
        props.showAlert("Text copied to clipboard", "Success");
      })
      .catch(() => {
        props.showAlert("Clipboard permission denied", "Error");
      });
  } else {
    // Fallback for mobile or insecure (HTTP)
    try {
      document.execCommand('copy'); // old method
      props.showAlert("Text copied to clipboard", "Success");
    } catch (err) {
      props.showAlert("Copy failed", "Error");
    }
  }
};


// Btn responsive style
const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
const btnStyle = {
  fontSize: screenWidth < 768 ? "30px" : "20px",
  display: screenWidth < 768 ? "flex" : "block",
  flexDirection: screenWidth< 768 ? "column":"block",
  gap:  screenWidth< 768 ?"10px":"0"
};

    return(
        <>
         <div className="container mt-4" mode={props.mode}>
      <form mode={props.mode}>
        <div className="mb-3">
          <label htmlFor="myTextArea" className="form-label" style={{fontFamily:"fantasy", fontWeight:"400", fontSize:"2rem"}}>{props.heading}</label>
          <textarea
            className="form-control"
            id="myTextArea"
            rows="8"
            placeholder="Type here..." 
             style={{backgroundColor: props.mode === "light"? "#ffffff":"#222831",color: props.mode === "light"? "black":"#ffffff"}}
             value={text} onChange={handleOnChange}
          ></textarea>
        </div>
        <div className='container' style={btnStyle}>
        <button className='btn btn-primary' onClick={handleUpClick}>Convert To upper case</button>
        <button className='btn btn-primary mx-2' onClick={handleSpeakClick}>Text To speech</button>
        <button className='btn btn-primary mx-2' onClick={handleRevClick}>Reverse Form text</button>
        <button className='btn btn-primary mx-2' onClick={handleDownClick}>Convert To lower case</button>
        <button className='btn btn-primary mx-2' onClick={handleCopyClick}>Copy To Clipboard</button>
        <button className='btn btn-danger mx-2' onClick={handleDelClick}>Delete Form text</button>
        </div>
      </form>
    </div>
    <div className='container my-3' >
        <h2>My Text Summary</h2>
        <p style={{fontWeight:"700"}}>Total no of words {text.trim().split(/\s+/).filter(Boolean).length} and {text.length} characters</p>
        <h2>Preview</h2>
        <p>{text}</p>
    </div>
        </>
    )
}