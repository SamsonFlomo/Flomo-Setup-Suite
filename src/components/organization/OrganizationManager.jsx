import { useContext } from "react";
import { useState } from "react";

import { OrganizationContext } from "../../context/OrganizationContext";

import OrganizationForm from "./OrganizationForm";
import DepartmentManager from "./DepartmentManager";

function OrganizationManager() {
  const { organizations, deleteOrganization } = useContext(OrganizationContext);
  const [editingOrganization, setEditingOrganization] = useState(null);

  return (
    <section>
      <h2>Organizations</h2>

      <OrganizationForm
        editingOrganization={editingOrganization}
        clearEdit={() => setEditingOrganization(null)}
      />

      <hr />

      <DepartmentManager />

      <hr />

      <h3>Existing Organizations</h3>

      {organizations.length === 0 ? (
        <p>No organizations added yet.</p>
      ) : (
        organizations.map((organization) => (
          <div key={organization.id}>
            <h4>{organization.name}</h4>

            <p>Code: {organization.code}</p>

            <p>Domain: {organization.domain}</p>

            <button onClick={() => setEditingOrganization(organization)}>
              Edit
            </button>

            <button onClick={() => deleteOrganization(organization.id)}>
              Delete
            </button>

          </div>
        ))
      )}
    </section>
  );
}

export default OrganizationManager;
