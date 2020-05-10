import React from "react";
import { render } from "react-dom";
import { App } from "./App";
import "./App.scss";
import { Auth0Provider } from "./react-auth0-spa";
import config from "./auth_config.json";
import { browserHistory } from "./helpers";

// A function that routes the user to the right place
// after login
const onRedirectCallback = (appState) => {
  browserHistory.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
// render(<App />, document.getElementById("root"));
