import { useContext } from "react";
import { useParams, Link } from "react-router-dom";

import { DeploymentContext } from "../../context/DeploymentContext";
import generateSetupReport from "../../services/reportService";

function SetupDetails() {
  const { id } = useParams();

  const { deployments } = useContext(DeploymentContext);

  const deployment = deployments.find((item) => item.id === Number(id));

  if (!deployment) {
    return (
      <section>
        <h1>Setup Not Found</h1>

        <Link to="/history">Back to History</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Setup Details</h1>

      <h2>Computer</h2>

      <p>Name: {deployment.computer?.name}</p>

      <p>Profile: {deployment.profile}</p>

      <h2>Deployment</h2>

      <p>Status: {deployment.status}</p>

      <p>Date: {new Date(deployment.date).toLocaleString()}</p>

      <hr />

      <h2>Software</h2>

      {deployment.software?.length === 0 ? (
        <p>No software selected</p>
      ) : (
        deployment.software?.map((software) => <p key={software}>{software}</p>)
      )}

      <hr />

      <h2>Users</h2>

      {deployment.users?.length === 0 ? (
        <p>No users configured</p>
      ) : (
        deployment.users?.map((user) => <p key={user.id}>{user.name}</p>)
      )}

      <hr />

      <Link to="/history">Back</Link>

      <button onClick={() => generateSetupReport(deployment)}>
        Export Report
      </button>
    </section>
  );
}

export default SetupDetails;
