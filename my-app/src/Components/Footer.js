import React from 'react'

export default function Footer(props){
    return(
        <>
            <footer className={`bg-${props.mode} text-${props.mode === "light"? "dark":"light"} text-center text-lg-start mt-5`}>
      <div className="container p-4">
        <div className="row">
          {/* Column 1 */}
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">MyApp</h5>
            <p>
              Bringing you awesome web experiences. Built with 💙 using React and Bootstrap.
            </p>
          </div>

          {/* Column 2 */}
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Quick Links</h5>
            <ul className="list-unstyled mb-0">
              <li><a href="#" className={`text-${props.mode === "light"? "dark":"light"} text-decoration-none`}>Home</a></li>
              <li><a href="#" className={`text-${props.mode === "light"? "dark":"light"} text-decoration-none`}>About</a></li>
              <li><a href="#" className={`text-${props.mode === "light"? "dark":"light"} text-decoration-none`}>Contact</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">Follow Us</h5>
            <a href="#" className={`text-${props.mode === "light"? "dark":"light"} me-3 text-decoration-none`}>Facebook</a>
            <a href="#" className={`text-${props.mode === "light"? "dark":"light"} me-3 text-decoration-none`}>Twitter</a>
            <a href="#" className={`text-${props.mode === "light"? "dark":"light"} text-decoration-none`}>Instagram</a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center p-3 bg-secondary" style={{color:"black", fontWeight:"500"}}>
        © {new Date().getFullYear()} MyApp | All rights reserved.
      </div>
    </footer>
        </>
    );
};