import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { SetupContext } from "../../context/SetupContext";
import { OrganizationContext } from "../../context/OrganizationContext";
import SaveTemplate from "../../components/setup/SaveTemplate";

import ROUTES from "../../constants/routes";

function ReviewSetup() {

    const { setupData } = useContext(SetupContext);
    const { organizations } = useContext(OrganizationContext);

    const navigate = useNavigate();

    const organization = organizations.find(
        (organization) =>
            organization.id === setupData.computer.organization
    );

    const department = organization?.departments?.find(
        (department) =>
            department.id === setupData.computer.department
    );

    return (

        <section>

            <h1>
                Review Setup
            </h1>

            <hr />

            <h2>Profile</h2>

            <p>
                {setupData.profile?.title}
            </p>

            <h2>Computer</h2>

            <p>
                <strong>Organization:</strong>{" "}
                {organization?.name || "Not selected"}
            </p>

            <p>
                <strong>Department:</strong>{" "}
                {department?.name || "Not selected"}
            </p>

            <p>
                <strong>Computer Name:</strong>{" "}
                {setupData.computer.name || "Not generated"}
            </p>

            <hr />

            <h2>Users</h2>

            {
                setupData.accounts.users.length === 0

                ?

                <p>No users configured.</p>

                :

                setupData.accounts.users.map((user) => (

                    <p key={user.id}>

                        {user.username} ({user.type})

                    </p>

                ))

            }

            <hr />

            <h2>Software</h2>

            {
                setupData.software.length === 0

                ?

                <p>No software selected.</p>

                :

                setupData.software.map((software) => (

                    <p key={software}>

                        {software}

                    </p>

                ))

            }

            <hr />

            <h2>Printers</h2>

            {
                setupData.printers.length === 0

                ?

                <p>No printers selected.</p>

                :

                setupData.printers.map((printer) => (

                    <p key={printer}>

                        {printer}

                    </p>

                ))

            }

            <hr />

            <h2>Options</h2>

            <p>
                Windows Update:
                {" "}
                {setupData.options.windowsUpdate ? "Yes" : "No"}
            </p>

            <p>
                Restart:
                {" "}
                {setupData.options.restart ? "Yes" : "No"}
            </p>

            <p>
                Generate Report:
                {" "}
                {setupData.options.generateReport ? "Yes" : "No"}
            </p>
 
            <hr />

            <button
                onClick={() => navigate(ROUTES.SETUP)}
            >
                Back
            </button>

            <button
                onClick={() => navigate(ROUTES.EXECUTION)}
            >
                Start Deployment
            </button>

            <hr />

            <SaveTemplate />

        </section>

    );

}

export default ReviewSetup;