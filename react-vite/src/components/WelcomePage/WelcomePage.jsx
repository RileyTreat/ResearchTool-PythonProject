import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";

function WelcomePage() {
  return (
    <div className="welcome-page">
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
  );
}

export default WelcomePage;
