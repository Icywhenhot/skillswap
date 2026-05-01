import React from "react";
import { Link } from "react-router-dom";
import { LogIn, UserPlus, User, Users, MessageSquare, ShieldCheck } from "lucide-react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import "./Home.css";
import bgImage from "../assets/auth-bg.jpg";

const Home = () => {
  const token = localStorage.getItem("token");
  let user = null;
  try {
    user = token ? JSON.parse(localStorage.getItem("user")) : null;
  } catch {
    user = null;
  }
  const isLoggedIn = Boolean(token);
  const isAdmin = user?.role === "admin";
  const firstName = (user?.name || "").split(" ")[0];

  return (
    <div
      className="home-hero"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="overlay" />
      <Navbar />

      <div className="hero-content">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-sky-300 via-indigo-300 to-fuchsia-300 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(99,102,241,0.35)]">
          Skill Swap
        </h1>

        {isLoggedIn ? (
          <>
            <h2 className="hero-title">
              Welcome back{firstName ? `, ${firstName}` : ""} 👋
            </h2>
            <p className="hero-subtitle">
              Pick up where you left off — find a new match, message a partner,
              or polish your profile.
            </p>

            <div className="cta-buttons">
              <Link to="/skill-matching" className="btn primary">
                <Users size={20} /> <span>Find a Match</span>
              </Link>
              <Link to="/chat" className="btn secondary">
                <MessageSquare size={20} /> <span>Open Chat</span>
              </Link>
              {isAdmin && (
                <Link to="/admin" className="btn secondary">
                  <ShieldCheck size={20} /> <span>Admin Dashboard</span>
                </Link>
              )}
            </div>
          </>
        ) : (
          <>
            <h2 className="hero-title">Connect. Learn. Grow — together.</h2>
            <p className="hero-subtitle">
              A community where learners meet learners. Share what you know,
              discover what you don't, and find a match who'll grow with you.
            </p>

            <div className="cta-buttons">
              <Link to="/login" className="btn primary">
                <LogIn size={20} /> <span>Login</span>
              </Link>
              <Link to="/register" className="btn secondary">
                <UserPlus size={20} /> <span>Register</span>
              </Link>
            </div>
          </>
        )}
      </div>

      <section className="glass-panel">
        {isLoggedIn ? (
          <div className="info-grid">
            <Link to="/profile" className="quick-card">
              <User size={26} />
              <h3>Your Profile</h3>
              <p>Update your skills, bio, and what you want to learn.</p>
            </Link>
            <Link to="/skill-matching" className="quick-card">
              <Users size={26} />
              <h3>Skill Matching</h3>
              <p>Browse peers and find your next learning partner.</p>
            </Link>
            <Link to="/chat" className="quick-card">
              <MessageSquare size={26} />
              <h3>Conversations</h3>
              <p>Continue chats and schedule sessions with matches.</p>
            </Link>
          </div>
        ) : (
          <div className="info-grid">
            <div>
              <h3>Discover Skills</h3>
              <p>
                Explore a wide range of topics offered by peers across the globe.
              </p>
            </div>
            <div>
              <h3>Find Your Match</h3>
              <p>Let smart matching pair you with ideal learning partners.</p>
            </div>
            <div>
              <h3>Grow Together</h3>
              <p>Teach what you know, learn what you love—side by side.</p>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Home;
