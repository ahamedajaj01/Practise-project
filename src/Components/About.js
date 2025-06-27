import React from 'react';

export default function About(props) {
    const darkStyle = {
  backgroundColor: '#222831',
    color: '#ffffff',
  
  };

  const lightStyle = {
  
      backgroundColor: '#ffffff',
    color: '#222831',
  
  };
  const currentStyle = props.mode === "dark"?darkStyle:lightStyle;
  return (
    <>
    <div className="container mt-5" style={currentStyle}>
      <div className="card shadow p-4" style={currentStyle}>
        <h2 className="card-title text-center mb-4">About This App</h2>
        <p className="card-text fs-5">
          Welcome to <strong>TextLab</strong> – your smart text assistant built with React!
        </p>
        <ul className="list-group list-group-flush my-3">
          <li className="list-group-item" style={currentStyle}>🔤 Convert text to UPPERCASE / lowercase</li>
          <li className="list-group-item" style={currentStyle}>🗣️ Speak out loud your typed text</li>
          <li className="list-group-item" style={currentStyle}>🔁 Reverse your text content</li>
          <li className="list-group-item" style={currentStyle}>📋 Copy text to clipboard in 1 click</li>
          <li className="list-group-item" style={currentStyle}>💡 Toggle between Light & Dark modes</li>
        </ul>
        <p className="card-text">
          This app is perfect for quick editing, formatting, or even having fun with your text. Built using <strong>React</strong> and <strong>Bootstrap</strong>.
        </p>
      </div>
    </div>
    </>
  );
}
