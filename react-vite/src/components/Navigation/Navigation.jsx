import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
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
