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
import { TemplateProvider } from "./context/TemplateContext";

import executionBridge from "./services/executionBridge";

executionBridge.initialize();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <OrganizationProvider>
        <TemplateProvider>
          <DeploymentProvider>
            <SetupProvider>
              <App />
            </SetupProvider>
          </DeploymentProvider>
        </TemplateProvider>
      </OrganizationProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
