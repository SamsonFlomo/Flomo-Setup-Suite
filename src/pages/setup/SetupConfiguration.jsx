import { useContext } from "react";

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

    const isPersonal =
        setupData.profile === "personal";

    const isCompanyLocal =
        setupData.profile === "company-local";

    const isCompanyDomain =
        setupData.profile === "company-domain";

    return (

        <div>

            <h1>Setup Configuration</h1>

            <ComputerIdentity />

            {(isCompanyLocal || isCompanyDomain) &&
                <DepartmentSettings />
            }

            {isCompanyDomain &&
                <NetworkSettings />
            }

            <UserManagement />

            <SoftwareSelection />

            {(isCompanyLocal || isCompanyDomain) &&
                <PrinterConfiguration />
            }

            <SetupOptions />

            <p>
                Computer Name: {setupData.computer.name}
            </p>

        </div>

    );
}

export default SetupConfiguration;