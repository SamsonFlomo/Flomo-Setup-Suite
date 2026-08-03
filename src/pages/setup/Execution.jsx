import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import ROUTES from "../../constants/routes";

import { DeploymentContext } from "../../context/DeploymentContext";
import { SetupContext } from "../../context/SetupContext";
import { OrganizationContext } from "../../context/OrganizationContext";

import deploymentPipeline from "../../services/deploymentPipeline";

import taskDisplayName from "../../utils/taskDisplayName";

import executionService from "../../services/executionService";

function Execution() {
  const navigate = useNavigate();

  const { addDeployment } = useContext(DeploymentContext);

  const { setupData } = useContext(SetupContext);

  const { organizations } = useContext(OrganizationContext);

  const selectedOrganization = organizations.find(
    (org) => org.id === Number(setupData.computer.organization),
  );

  const selectedDepartment = selectedOrganization?.departments.find(
    (dept) => dept.id === Number(setupData.computer.department),
  );

  const [steps, setSteps] = useState([]);

  useEffect(() => {
    async function executeDeployment() {
      try {
        setSteps((previous) =>
          previous.map((step, index) =>
            index === 0 ? { ...step, status: "running" } : step,
          ),
        );

        await executionService.start({
          setupData,
        });

        const deploymentResult = await deploymentPipeline.deploy(setupData);

        setSteps(
          deploymentResult.tasks.map((task) => ({
            id: task.id,

            name: taskDisplayName(task.type),

            status: "completed",
          })),
        );

        setSteps((previous) =>
          previous.map((step) => ({
            ...step,
            status: "completed",
          })),
        );

        addDeployment({
          id: Date.now(),

          computer: {
            name: setupData.computer.name,

            organization: {
              id: selectedOrganization?.id,

              name: selectedOrganization?.name,

              code: selectedOrganization?.code,
            },

            department: {
              id: selectedDepartment?.id,

              name: selectedDepartment?.name,
            },

            type: setupData.computer.type,

            number: setupData.computer.number,

            domain: setupData.computer.domain,

            ipAddress: setupData.computer.ipAddress,

            workgroup: setupData.computer.workgroup,
          },

          profile: setupData.profile?.title,

          users: setupData.accounts.users,

          administrators: setupData.accounts.administrators,

          software: setupData.software,

          printers: setupData.printers,

          options: setupData.options,

          execution: deploymentResult,

          status: deploymentResult.result.success ? "Successful" : "Failed",

          date: new Date().toISOString(),
        });

        navigate(ROUTES.COMPLETION);
      } catch (error) {
        console.error(error);
      }
    }

    executeDeployment();
  }, []);

  return (
    <section>
      <h1>Deployment Execution</h1>

      <p>Flomo Setup Suite is applying configuration.</p>

      {steps.map((step) => (
        <div key={step.id}>
          <strong>{step.name}</strong>

          {" - "}

          {step.status}
        </div>
      ))}
    </section>
  );
}

export default Execution;
