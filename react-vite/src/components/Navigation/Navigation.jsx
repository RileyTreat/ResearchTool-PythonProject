import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useLocation } from "react-router-dom";

function Navigation() {
  const location = useLocation();

  // Do not render NavBar if the current path is "/"
  if (location.pathname === "/") {
    return null;
  }


  return (
    <nav className="navbar">
      
      <NavLink to="/home" className="navbar-logo">
        <img src="/curiorelica-high-resolution-logo.png" alt="CurioRelica Logo" />
      </NavLink>

      <div className="navbar-profile">
        <NavLink to="/artifacts/new" className="create-artifact-button">
          Create a New Artifact
        </NavLink>
        <ProfileButton />
      </div>
    </nav>
  );
}

export default Navigation;
