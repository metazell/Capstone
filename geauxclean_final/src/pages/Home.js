import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="container-fluid text-center">
          <h1 className="hero-title">Welcome to GeauxClean</h1>
          <p className="hero-subtitle">
            Your home deserves the best care. Hire a pro and enjoy spotless, stress-free living!
          </p>
          <Link to="/booking" className="btn btn-primary btn-lg cta-button">Hire a Pro</Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="container-fluid text-center">
          <h2 className="section-title">Services Offered</h2>
          <p>We offer a variety of professional cleaning services to suit your needs:</p>
          <div className="row">
            <div className="col-md-4">
              <h4>Deep Cleaning</h4>
              <p>Thorough cleaning for those hard-to-reach areas.</p>
            </div>
            <div className="col-md-4">
              <h4>Regular Cleaning</h4>
              <p>Keep your home tidy with regular maintenance cleanings.</p>
            </div>
            <div className="col-md-4">
              <h4>Vacuuming</h4>
              <p>Get rid of dust and dirt with professional vacuuming services.</p>
            </div>
            <div className="col-md-4">
              <h4>Pressure Washing</h4>
              <p>Revive your outdoor surfaces with expert pressure washing.</p>
            </div>
            <div className="col-md-4">
              <h4>Window Cleaning</h4>
              <p>Let the sunshine in with spotless windows inside and out.</p>
            </div>
            <div className="col-md-4">
              <h4>Carpet Cleaning</h4>
              <p>Remove dirt and stains with professional carpet cleaning.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
