import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import ROUTES from "../../constants/routes";

import { DeploymentContext } from "../../context/DeploymentContext";
import { SetupContext } from "../../context/SetupContext";
import { OrganizationContext } from "../../context/OrganizationContext";

import deploymentPipeline from "../../services/deploymentPipeline";
import executionService from "../../services/executionService";

import createExecutionPlan from "../../../backend/planner/ExecutionPlanner.js";
import taskDisplayName from "../../utils/taskDisplayName";

function Execution() {
  const navigate = useNavigate();

  const { addDeployment } = useContext(DeploymentContext);

  const { setupData } = useContext(SetupContext);

  const { organizations } = useContext(OrganizationContext);

  const [steps, setSteps] = useState([]);

  const [executionState, setExecutionState] = useState("idle");

  const [failedTask, setFailedTask] = useState(null);

  const selectedOrganization = organizations.find(
    (org) => org.id === Number(setupData.computer.organization),
  );

  const selectedDepartment = selectedOrganization?.departments.find(
    (dept) => dept.id === Number(setupData.computer.department),
  );

  useEffect(() => {
    const plannedTasks = createExecutionPlan(setupData);

    setSteps(
      plannedTasks.map((task) => ({
        id: task.id,

        name: taskDisplayName(task),

        status: "pending",
      })),
    );

    const removeProgressListener = executionService.subscribeProgress(
      (progress) => {
        if (progress.type !== "task") {
          return;
        }

        setSteps((previous) =>
          previous.map((step) =>
            step.id === progress.taskId
              ? {
                  ...step,

                  status: progress.status,
                }
              : step,
          ),
        );

        if (progress.status === "failed") {
          setFailedTask(progress.taskId);
        }
      },
    );

    const removeStateListener = executionService.subscribeState((state) => {
      setExecutionState(state.state);
    });

    async function runDeployment() {
      try {
        const deploymentResult = await deploymentPipeline.deploy(setupData);

        if (deploymentResult.success) {
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

            status: "Successful",

            date: new Date().toISOString(),
          });

          navigate(ROUTES.COMPLETION);
        }
      } catch (error) {
        console.error(error);
      }
    }

    runDeployment();

    return () => {
      removeProgressListener();

      removeStateListener();
    };
  }, []);

  return (
    <section>
      <h1>Deployment Execution</h1>

      <p>Current State: {executionState}</p>

      <button
        onClick={() => executionService.pause()}
        disabled={executionState !== "running"}
      >
        Pause
      </button>

      <button
        onClick={() => executionService.resume()}
        disabled={executionState !== "paused"}
      >
        Resume
      </button>

      <button
        onClick={() => executionService.cancel()}
        disabled={executionState === "completed"}
      >
        Cancel
      </button>

      <button onClick={() => executionService.retry()} disabled={!failedTask}>
        Retry Failed Task
      </button>

      <button onClick={() => executionService.skip()} disabled={!failedTask}>
        Skip Failed Task
      </button>

      <hr />

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
