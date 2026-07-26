import { useContext } from "react";

import { OrganizationContext } from "../../context/OrganizationContext";

import Card from "../common/Card";

function StatisticsCards() {
  const { organizations } = useContext(OrganizationContext);

  return (
    <section>
      <h2>System Overview</h2>

      <div className="dashboard-grid">
        <Card>
          <h3>Organizations</h3>

          <p className="stat-number">{organizations.length}</p>
        </Card>

        <Card>
          <h3>Computers Configured</h3>

          <p className="stat-number">0</p>
        </Card>

        <Card>
          <h3>Successful Deployments</h3>

          <p className="stat-number">0</p>
        </Card>
      </div>
    </section>
  );
}

export default StatisticsCards;
