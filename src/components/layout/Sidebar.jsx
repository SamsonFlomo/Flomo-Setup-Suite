import { NavLink } from "react-router-dom";

import ROUTES from "../../constants/routes";

function Sidebar() {
  return (
    <aside>
      <h2>Flomo Setup Suite</h2>

      <nav>
        <NavLink to={ROUTES.DASHBOARD}>Dashboard</NavLink>

        <NavLink to={ROUTES.PROFILE_SELECTION}>New Setup</NavLink>

        <NavLink to={ROUTES.ORGANIZATIONS}>Organizations</NavLink>

        <NavLink to={ROUTES.SETTINGS}>Settings</NavLink>

        <NavLink to={ROUTES.HISTORY}>Setup History</NavLink>

        <NavLink to={ROUTES.TEMPLATES}>Templates</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
