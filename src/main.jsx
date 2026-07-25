import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { SetupProvider } from "./context/SetupContext";
import { OrganizationProvider } from "./context/OrganizationContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <OrganizationProvider>
        <SetupProvider>
          <App />
        </SetupProvider>
      </OrganizationProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
