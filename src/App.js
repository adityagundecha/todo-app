import React, { useState } from "react";
import PropTypes from "prop-types";
import { Header } from "./components/layout/Header";
import { Content } from "./components/layout/Content";
import { ProjectsProvider, SelectedProjectProvider } from "./context";
import { Router, Route, Switch } from "react-router-dom";
import { browserHistory } from "./helpers";
import Profile from "./components/Profile";
import { useAuth0 } from "./react-auth0-spa";
import PrivateRoute from "./components/PrivateRoute";

export const App = ({ darkModeDefault = false }) => {
  const { isAuthenticated, loading, user } = useAuth0();
  const [darkMode, setDarkMode] = useState(darkModeDefault);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Router history={browserHistory}>
      <SelectedProjectProvider>
        <ProjectsProvider>
          <main
            data-testid="application"
            className={darkMode ? "darkmode" : undefined}
          >
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            {isAuthenticated && <Content currentUser={user}/>}
          </main>
        </ProjectsProvider>
      </SelectedProjectProvider>
      <Switch>
        <Route path="/" exact />
        {/* <PrivateRoute path="/profile" component={Profile} /> */}
      </Switch>
    </Router>
  );
};

App.propTypes = {
  darkModeDefault: PropTypes.bool,
};
