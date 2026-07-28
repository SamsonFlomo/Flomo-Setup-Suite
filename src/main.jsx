import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { SetupProvider } from "./context/SetupContext";
import { OrganizationProvider } from "./context/OrganizationContext.jsx";
import "./assets/styles/components/dashboard.css";
import "./assets/styles/global.css";
import "./assets/styles/layout.css";
import "./assets/styles/buttons.css";
import "./assets/styles/components/dashboard.css";
import { DeploymentProvider } from "./context/DeploymentContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <OrganizationProvider>
        <SetupProvider>
          <DeploymentProvider>
            <App />
          </DeploymentProvider>
        </SetupProvider>
      </OrganizationProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
