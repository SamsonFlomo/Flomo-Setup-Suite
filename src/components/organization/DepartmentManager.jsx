import { useContext, useState } from "react";

import { OrganizationContext } from "../../context/OrganizationContext";

function DepartmentManager() {
  const {
    organizations,

    addDepartment,

    updateDepartment,

    deleteDepartment,

    selectedOrganization,
  } = useContext(OrganizationContext);

  const [selectedOrganizationId, setSelectedOrganizationId] = useState("");

  const [departmentName, setDepartmentName] = useState("");

  const [editingDepartment, setEditingDepartment] = useState(null);

  const organization = organizations.find(
    (organization) => organization.id === Number(selectedOrganizationId),
  );

  function handleSaveDepartment() {
    if (!organization || !departmentName) {
      return;
    }

    if (editingDepartment) {
      const updatedDepartment = {
        id: editingDepartment.id,

        name: departmentName,
      };

      updateDepartment(
        organization.id,

        updatedDepartment,
      );
    } else {
      const newDepartment = {
        id: Date.now(),

        name: departmentName,
      };

      addDepartment(
        organization.id,

        newDepartment,
      );
    }

    setDepartmentName("");

    setEditingDepartment(null);
  }

  function handleEditDepartment(department) {
    setEditingDepartment(department);

    setDepartmentName(department.name);
  }

  function cancelEdit() {
    setEditingDepartment(null);

    setDepartmentName("");
  }

  return (
    <section>
      <h2>Department Management</h2>

      <label>Select Organization</label>

      <select
        value={selectedOrganizationId}
        onChange={(event) => setSelectedOrganizationId(event.target.value)}
      >
        <option value="">Select Organization</option>

        {organizations.map((organization) => (
          <option key={organization.id} value={organization.id}>
            {organization.name}
          </option>
        ))}
      </select>

      {organization && (
        <>
          <h3>Departments</h3>

          {organization.departments.length === 0 ? (
            <p>No departments added.</p>
          ) : (
            organization.departments.map((department) => (
              <div key={department.id}>
                <span>{department.name}</span>

                <button onClick={() => handleEditDepartment(department)}>
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteDepartment(
                      organization.id,

                      department.id,
                    )
                  }
                >
                  Delete
                </button>
              </div>
            ))
          )}

          <hr />

          <h3>{editingDepartment ? "Edit Department" : "Add Department"}</h3>

          <input
            value={departmentName}
            placeholder="Department name"
            onChange={(event) => setDepartmentName(event.target.value)}
          />

          <button onClick={handleSaveDepartment}>
            {editingDepartment ? "Save Changes" : "Add Department"}
          </button>

          {editingDepartment && <button onClick={cancelEdit}>Cancel</button>}
        </>
      )}
    </section>
  );
}

export default DepartmentManager;
