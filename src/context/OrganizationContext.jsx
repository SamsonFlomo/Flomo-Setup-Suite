import { createContext, useState } from "react";

export const OrganizationContext = createContext();

export function OrganizationProvider({ children }) {
  const [organizations, setOrganizations] = useState([]);

  function addOrganization(organization) {
    setOrganizations((previousOrganizations) => [
      ...previousOrganizations,

      organization,
    ]);
  }

  function updateOrganization(
    organizationId,
    updatedOrganization
){


    setOrganizations((previousOrganizations)=>

        previousOrganizations.map((organization)=>

            organization.id === organizationId

            ?

            {
                ...organization,
                ...updatedOrganization
            }

            :

            organization

        )

    );


}

  function deleteOrganization(id) {
    setOrganizations((previousOrganizations) =>
      previousOrganizations.filter((organization) => organization.id !== id),
    );
  }

  function addDepartment(organizationId, department) {
    setOrganizations((previousOrganizations) =>
      previousOrganizations.map((organization) =>
        organization.id === organizationId
          ? {
              ...organization,

              departments: [...organization.departments, department],
            }
          : organization,
      ),
    );
  }

  function updateDepartment(organizationId, departmentId, updatedDepartment) {
    setOrganizations((previousOrganizations) =>
      previousOrganizations.map((organization) => {
        if (organization.id !== organizationId) {
          return organization;
        }

        return {
          ...organization,

          departments: organization.departments.map((department) =>
            department.id === departmentId
              ? {
                  ...department,
                  ...updatedDepartment,
                }
              : department,
          ),
        };
      }),
    );
  }

  function deleteDepartment(organizationId, departmentId) {
    setOrganizations((previousOrganizations) =>
      previousOrganizations.map((organization) => {
        if (organization.id !== organizationId) {
          return organization;
        }

        return {
          ...organization,

          departments: organization.departments.filter(
            (department) => department.id !== departmentId,
          ),
        };
      }),
    );
  }

  return (
    <OrganizationContext.Provider
      value={{

    organizations,

    addOrganization,

    updateOrganization,

    deleteOrganization,

    addDepartment,

    updateDepartment,

    deleteDepartment

}}
    >
      {children}
    </OrganizationContext.Provider>
  );
}
