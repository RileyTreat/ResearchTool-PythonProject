import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import { useNavigate } from "react-router-dom";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./ProfileButton.css";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate("/");
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeMenu();
  };

  return (
    <>
      <button onClick={toggleMenu} className="profile-icon">
        <FaUserCircle size={24} color="#a19ef5" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown" ref={ulRef}>
          {user ? (
            <>
              {/* Logged-in user info */}
              <li className="profile-info">{user.username}</li>
              <li className="profile-info">{user.email}</li>
              <li>
                <button
                  className="manage-button"
                  onClick={() => handleNavigation("/archiver/artifacts")}
                >
                  Manage Artifacts
                </button>
              </li>
              <li>
                <button
                  className="manage-button"
                  onClick={() => handleNavigation("/archiver/questions")}
                >
                  Manage Questions
                </button>
              </li>
              <li>
                <button
                  className="manage-button"
                  onClick={() => handleNavigation("/archiver/answers")}
                >
                  Manage Answers
                </button>
              </li>
              <li>
                <button
                  className="logout-button"
                  onClick={logout}
                >
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              {/* Guest options */}
              <li>
                <OpenModalMenuItem
                  itemText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </li>
              <li>
                <OpenModalMenuItem
                  itemText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </li>
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
