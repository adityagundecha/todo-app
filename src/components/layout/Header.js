import React, { useState } from "react";
import { FaSun } from "react-icons/fa";
import PropTypes from "prop-types";
import { AddTask } from "../AddTask";
import { useAuth0 } from "../../react-auth0-spa";

export const Header = ({ darkMode, setDarkMode }) => {
  const { user,isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  return (
    <header className="header" data-testid="header">
      <nav>
        <div className="logo">
          <img src="/images/logo.png" alt="Todoist" />
        </div>
        <div className="settings">
          <ul>
            {!isAuthenticated && <li className="login__label">Please Log In</li>}
            {isAuthenticated && (
              <li className="settings__add">
                <button
                  data-testid="quick-add-task-action"
                  aria-label="Quick add task"
                  type="button"
                  onClick={() => {
                    setShowQuickAddTask(true);
                    setShouldShowMain(true);
                  }}
                  onKeyDown={() => {
                    setShowQuickAddTask(true);
                    setShouldShowMain(true);
                  }}
                >
                  +
                </button>
              </li>
            )}

            {isAuthenticated && (
              <li className="settings__darkmode">
                <button
                  data-testid="dark-mode-action"
                  aria-label="Darkmode on/off"
                  type="button"
                  onClick={() => setDarkMode(!darkMode)}
                  onKeyDown={() => setDarkMode(!darkMode)}
                >
                  <FaSun />
                </button>
              </li>
            )}
            <li className="avatar">               
              {isAuthenticated && (
                  <img src={user.picture} alt="Profile" className="avatar" onClick={() => setShowLogout(!showLogout)} onKeyDown={() => setShowLogout(!showLogout)}/>
                )}
            </li>
            <li className="login__button">
              <div aria-label="Log in / out">
                {!isAuthenticated && (
                  <button onClick={() => loginWithRedirect({})}>Log in</button>
                )}

                {isAuthenticated && showLogout && (
                  <button onClick={() => logout()}>Log out</button>
                )}
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <AddTask
        showAddTaskMain={false}
        shouldShowMain={shouldShowMain}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />
    </header>
  );
};

Header.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};
