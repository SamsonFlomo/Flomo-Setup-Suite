import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../constants/routes";

import { SetupContext } from "../../context/SetupContext";

import ComputerIdentity from "../../components/setup/ComputerIdentity";
import DepartmentSettings from "../../components/setup/DepartmentSettings";
import NetworkSettings from "../../components/setup/NetworkSettings";
import UserManagement from "../../components/setup/UserManagement";
import SoftwareSelection from "../../components/setup/SoftwareSelection";
import PrinterConfiguration from "../../components/setup/PrinterConfiguration";
import SetupOptions from "../../components/setup/SetupOptions";

function SetupConfiguration() {
  const { setupData } = useContext(SetupContext);
  const navigate = useNavigate();

  const profileId = setupData.profile?.id;

  const isPersonal = profileId === "personal";

  const isCompanyLocal = profileId === "company-local";

  const isCompanyDomain = profileId === "company-domain";

  return (
    <div>
      <h1>Setup Configuration</h1>

      {setupData.profile && <p>Profile: {setupData.profile.title}</p>}

      <ComputerIdentity />

      {(isCompanyLocal || isCompanyDomain) && <DepartmentSettings />}

      {isCompanyDomain && <NetworkSettings />}

      <UserManagement />

      <SoftwareSelection />

      {(isCompanyLocal || isCompanyDomain) && <PrinterConfiguration />}

      <SetupOptions />

      <p>Computer Name: {setupData.computer.name}</p>

      <button onClick={() => navigate(ROUTES.REVIEW)}>Review Setup</button>

      {/* Testing the SetupConfiguration data */}

      <h1>Setup Configuration</h1>

      {setupData.profile && (
        <div>
          <h3>Selected Profile Settings</h3>

          <p>
            Domain Join: {setupData.profile.settings.domainJoin ? "Yes" : "No"}
          </p>

          <p>
            Office Installation:{" "}
            {setupData.profile.settings.installOffice ? "Yes" : "No"}
          </p>

          <p>
            Standard User:{" "}
            {setupData.profile.settings.createStandardUser ? "Yes" : "No"}
          </p>
        </div>
      )}
    </div>
  );
}

export default SetupConfiguration;
