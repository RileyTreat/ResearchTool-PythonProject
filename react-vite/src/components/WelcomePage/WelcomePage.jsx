import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import "./WelcomePage.css";

function WelcomePage() {
  return (
    <div className="welcome-page">
      <div className="welcome-content">
        {/* Left Section: Image */}
        <div className="welcome-image">
          <img
            src="/curiorelica-high-resolution-logo.png" 
            alt="CurioRelica Welcome"
          />
        </div>

        {/* Right Section: Text and Buttons */}
        <div className="welcome-text">
          <h1>Welcome to CurioRelica!</h1>
          <h2>Please Log In or Create an account.</h2>
          <div className="welcome-buttons">
            <OpenModalButton
              modalComponent={<LoginFormModal />}
              buttonText="Log In"
            />
            <OpenModalButton
              modalComponent={<SignupFormModal />}
              buttonText="Sign Up"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
