import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

import ProfileSelection from "./pages/setup/ProfileSelection";
import SetupConfiguration from "./pages/setup/SetupConfiguration";
import ReviewSetup from "./pages/setup/ReviewSetup";
import Execution from "./pages/setup/Execution";
import Completion from "./pages/setup/Completion";

import Dashboard from "./pages/dashboard/Dashboard";
import Organizations from "./pages/organization/Organizations";
import ApplicationSettings from "./pages/settings/ApplicationSettings";
import SetupHistory from "./pages/history/SetupHistory";
import SetupDetails from "./pages/history/SetupDetails";
import Templates from "./pages/templates/Templates";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/history" element={<SetupHistory />} />

        <Route path="/organizations" element={<Organizations />} />

        <Route path="/settings" element={<ApplicationSettings />} />

        <Route path="/" element={<ProfileSelection />} />

        <Route path="/setup" element={<SetupConfiguration />} />

        <Route path="/setup/profile" element={<ProfileSelection />} />

        <Route path="/setup/review" element={<ReviewSetup />} />

        <Route path="/setup/execution" element={<Execution />} />

        <Route path="/setup/completion" element={<Completion />} />

        <Route path="/history/:id" element={<SetupDetails />} />

        <Route path="/templates" element={<Templates />} />
      </Route>
    </Routes>
  );
}

export default App;
