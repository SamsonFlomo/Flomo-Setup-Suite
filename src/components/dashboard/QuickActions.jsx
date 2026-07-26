import { useNavigate } from "react-router-dom";

import ROUTES from "../../constants/routes";

import Card from "../common/Card";

function QuickActions() {
  const navigate = useNavigate();

  return (
    <section>
      <h2>Quick Actions</h2>

      <div className="dashboard-grid">
        <Card>
          <h3>New Computer Setup</h3>

          <p>Configure a new Windows computer.</p>

          <button onClick={() => navigate(ROUTES.PROFILE_SELECTION)}>
            Start Setup
          </button>
        </Card>

        <Card>
          <h3>Organizations</h3>

          <p>Manage companies and departments.</p>

          <button onClick={() => navigate(ROUTES.ORGANIZATIONS)}>Manage</button>
        </Card>

        <Card>
          <h3>Settings</h3>

          <p>Configure application preferences.</p>

          <button onClick={() => navigate(ROUTES.SETTINGS)}>
            Open Settings
          </button>
        </Card>
      </div>
    </section>
  );
}

export default QuickActions;
