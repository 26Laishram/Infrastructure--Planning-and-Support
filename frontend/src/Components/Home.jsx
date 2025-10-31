import React from "react";
import "../Styles/Home.css";

function Home() {
  return (
    <div className="home-container">

      <main className="home-main">
        <div className="home-button-container">
          <a
            href="https://ccshelpdesk.iitdh.ac.in/login.php"
            target="_blank"
            rel="noopener noreferrer"
            className="home-button"
          >
            CCS Helpdesk
          </a>

          <a
            href="https://cims.iitdh.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="home-button secondary"
          >
            CIMS Portal
          </a>
        </div>
      </main>

      <footer className="home-footer">
        <p>© {new Date().getFullYear()} Indian Institute of Technology Dharwad</p>
      </footer>
    </div>
  );
}

export default Home;
