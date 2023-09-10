import React from "react";

import "./landing.css";

const Landing = () => {
  return (
    <div className="landing-page">
        <header className="header">
            <nav className="nav">
                <div className="container">
                    <h1>Your Fitness App</h1>
                    <ul className="nav-list">
                        <li><a href="#features">Features</a></li>
                        <li><a href="#download">Download</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>
            </nav>
        </header>

        <section className="hero">
            <div className="container">
                <h2>Your All-in-One Fitness Solution</h2>
                <p>Get fit, stay motivated, and achieve your fitness goals with our comprehensive fitness app.</p>
                <a href="#download" className="cta-button">Download Now</a>
            </div>
        </section>

        <section className="features" id="features">
            <div className="container">
                <h2>Features</h2>
                {/* Add feature components here */}
            </div>
        </section>

        <section className="download" id="download">
            <div className="container">
                <h2>Download Your Fitness App Today</h2>
                {/* eslint-disable-next-line */}
                <a href="#" className="cta-button">Download Now</a>
            </div>
        </section>

        <section className="contact" id="contact">
            <div className="container">
                <h2>Contact Us</h2>
                <p>If you have any questions or feedback, feel free to reach out to us.</p>
                <a href="mailto:info@yourfitnessapp.com" className="cta-button">Email Us</a>
            </div>
        </section>

        <footer className="footer">
            <div className="container">
                <p>&copy; {new Date().getFullYear()} Your Fitness App</p>
            </div>
        </footer>
    </div>
  );
};

export default Landing;
