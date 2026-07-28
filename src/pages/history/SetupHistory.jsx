import { useContext } from "react";
import { Link } from "react-router-dom";

import { DeploymentContext } from "../../context/DeploymentContext";

function SetupHistory() {
  const { deployments } = useContext(DeploymentContext);

  return (
    <section>
      <h1>Setup History</h1>

      {deployments.length === 0 ? (
        <p>No setup records available.</p>
      ) : (
        deployments
          .slice()
          .reverse()
          .map((deployment) => (
            <div key={deployment.id}>
              <h3>{deployment.computerName || "Unnamed Computer"}</h3>

              <p>Profile: {deployment.profile?.title}</p>

              <p>Status: {deployment.status}</p>

              <p>Date: {new Date(deployment.date).toLocaleString()}</p>

              <hr />

              <Link to={`/history/${deployment.id}`}>View Details</Link>
            </div>
          ))
      )}
    </section>
  );
}

export default SetupHistory;
