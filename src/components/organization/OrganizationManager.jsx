import { useContext } from "react";
import { useState } from "react";

import { OrganizationContext } from "../../context/OrganizationContext";

import OrganizationForm from "./OrganizationForm";
import DepartmentManager from "./DepartmentManager";
import OrganizationCard from "./OrganizationCard";

function OrganizationManager() {
  const {
    organizations,
    deleteOrganization,
    selectOrganization,
    selectedOrganization,
  } = useContext(OrganizationContext);
  const [editingOrganization, setEditingOrganization] = useState(null);

  return (
    <section>
      <OrganizationForm
        editingOrganization={editingOrganization}
        clearEdit={() => setEditingOrganization(null)}
      />

      <hr />

      {selectedOrganization && (
        <>
          <h3>Manage Departments</h3>

          <DepartmentManager />
        </>
      )}

      <hr />

      <h3>Existing Organizations</h3>

      {organizations.length === 0 ? (
        <p>No organizations added yet.</p>
      ) : (
        organizations.map((organization) => (
          <OrganizationCard
            key={organization.id}
            organization={organization}
            onDelete={deleteOrganization}
            onEdit={setEditingOrganization}
            onManageDepartments={selectOrganization}
          />
        ))
      )}
    </section>
  );
}

export default OrganizationManager;
