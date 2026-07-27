import { createContext, useState } from "react";

export const OrganizationContext = createContext();


export function OrganizationProvider({ children }) {


    const [organizations, setOrganizations] = useState([]);


    const [selectedOrganization, setSelectedOrganization] = useState(null);



    function addOrganization(newOrganization) {


        setOrganizations((previousOrganizations) => [

            ...previousOrganizations,

            {

                ...newOrganization,

                departments: []

            }

        ]);

    }





    function updateOrganization(updatedOrganization) {


        setOrganizations((previousOrganizations) =>

            previousOrganizations.map((organization) =>


                organization.id === updatedOrganization.id

                ?

                updatedOrganization

                :

                organization


            )

        );


        if (

            selectedOrganization &&

            selectedOrganization.id === updatedOrganization.id

        ) {

            setSelectedOrganization(updatedOrganization);

        }


    }





    function deleteOrganization(id) {


        setOrganizations((previousOrganizations) =>

            previousOrganizations.filter(

                (organization) => organization.id !== id

            )

        );



        if (

            selectedOrganization &&

            selectedOrganization.id === id

        ) {

            setSelectedOrganization(null);

        }


    }





    function selectOrganization(id) {


        const organization = organizations.find(

            (organization) => organization.id === id

        );


        setSelectedOrganization(organization);


    }





    function addDepartment(organizationId, department) {


        setOrganizations((previousOrganizations) =>

            previousOrganizations.map((organization) => {


                if (organization.id !== organizationId) {

                    return organization;

                }



                return {


                    ...organization,


                    departments: [

                        ...organization.departments,

                        department

                    ]

                };


            })

        );


    }





    function updateDepartment(

        organizationId,

        updatedDepartment

    ) {


        setOrganizations((previousOrganizations) =>

            previousOrganizations.map((organization) => {


                if (organization.id !== organizationId) {

                    return organization;

                }



                return {


                    ...organization,


                    departments:

                        organization.departments.map(

                            (department) =>


                                department.id === updatedDepartment.id

                                ?

                                updatedDepartment

                                :

                                department

                        )


                };


            })

        );


    }





    function deleteDepartment(

        organizationId,

        departmentId

    ) {


        setOrganizations((previousOrganizations) =>

            previousOrganizations.map((organization) => {


                if (organization.id !== organizationId) {

                    return organization;

                }



                return {


                    ...organization,


                    departments:

                        organization.departments.filter(

                            (department) =>

                                department.id !== departmentId

                        )


                };


            })

        );


    }





    return (

        <OrganizationContext.Provider

            value={{

                organizations,

                selectedOrganization,


                addOrganization,

                updateOrganization,

                deleteOrganization,


                selectOrganization,


                addDepartment,

                updateDepartment,

                deleteDepartment


            }}

        >

            {children}

        </OrganizationContext.Provider>

    );

}