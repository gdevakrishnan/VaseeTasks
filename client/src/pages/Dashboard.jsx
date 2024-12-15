import React from 'react';
import "../static/dashboard.css";

function Dashboard() {
  return (
    <section className="page dashboard dashboard_page">
      <div className="hero">
        <h1>Welcome to Your <span style={{color: "#1976d2"}}>VaseeTasks</span></h1>
        <p>Manage your business tasks effectively and boost your productivity.</p>
        <button className="cta-btn">Get Started</button>
      </div>
    </section>
  );
}

export default Dashboard;
