import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import ROUTES from "../../constants/routes";

import { DeploymentContext } from "../../context/DeploymentContext";
import { SetupContext } from "../../context/SetupContext";
import { OrganizationContext } from "../../context/OrganizationContext";

import deploymentPipeline from "../../services/deploymentPipeline";

import executionService from "../../services/executionService";

import createExecutionPlan from "../../../backend/planner/ExecutionPlanner.js";

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

  const updateProgress = (progress) => {
    if (progress.type !== "task") {
      return;
    }

    setSteps((previous) =>
      previous.map((step) => {
        if (step.id === progress.taskId) {
          return {
            ...step,

            status: progress.status,
          };
        }

        return step;
      }),
    );
  };

  useEffect(() => {
    const cleanup = executionService.subscribeProgress(updateProgress);

    return () => {
      cleanup();
    };

    async function executeDeployment() {
      try {
        const plannedTasks = createExecutionPlan(setupData);

        setSteps(
          plannedTasks.map((task) => ({
            id: task.id,

            name: task.name,

            status: "pending",
          })),
        );

        const deploymentResult = await deploymentPipeline.deploy(setupData);

        setSteps(
          deploymentResult.tasks.map((task) => ({
            id: task.id,

            name: task.name,

            status: "pending",
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

    return () => {
      executionProgressService.unsubscribe(updateProgress);
    };
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
