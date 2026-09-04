import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">SamadhanSetu</Link>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/citizen/report">Report Problem</Link>
        <Link to="/citizen/dashboard">Citizen</Link>
        <Link to="/university/dashboard">University</Link>
        <Link to="/industry/dashboard">Industry</Link>
        <Link to="/government/dashboard">Government</Link>
        <Link to="/login" className="login-btn">
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;