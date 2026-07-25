import { useContext, useState } from "react";

import { OrganizationContext } from "../../context/OrganizationContext";


function DepartmentManager(){

    const {

        organizations,

        addDepartment,

        deleteDepartment

    } = useContext(OrganizationContext);



    const [selectedOrganization, setSelectedOrganization] = useState("");

    const [departmentName, setDepartmentName] = useState("");



    const organization = organizations.find(

        (organization) =>

        organization.id === Number(selectedOrganization)

    );



    function handleAddDepartment(){


        if(!organization || !departmentName){

            return;

        }


        const newDepartment = {

            id: Date.now(),

            name: departmentName

        };


        addDepartment(

            organization.id,

            newDepartment

        );


        setDepartmentName("");

    }




    return (

        <section>


            <h2>
                Department Management
            </h2>



            <label>
                Select Organization
            </label>


            <select

                value={selectedOrganization}

                onChange={(event)=>

                    setSelectedOrganization(

                        event.target.value

                    )

                }

            >


                <option value="">

                    Select Organization

                </option>



                {

                    organizations.map((organization)=>(

                        <option

                            key={organization.id}

                            value={organization.id}

                        >

                            {organization.name}

                        </option>

                    ))

                }


            </select>




            {

                organization && (

                    <>


                        <h3>

                            Departments

                        </h3>



                        {

                            organization.departments.length === 0

                            ?

                            (

                                <p>

                                    No departments added.

                                </p>

                            )

                            :

                            (

                                organization.departments.map((department)=>(


                                    <div

                                        key={department.id}

                                    >

                                        <span>

                                            {department.name}

                                        </span>



                                        <button

                                            onClick={()=>


                                                deleteDepartment(

                                                    organization.id,

                                                    department.id

                                                )


                                            }

                                        >

                                            Delete

                                        </button>


                                    </div>


                                ))

                            )

                        }



                        <hr />



                        <h3>

                            Add Department

                        </h3>



                        <input

                            value={departmentName}

                            placeholder="Department name"

                            onChange={(event)=>

                                setDepartmentName(

                                    event.target.value

                                )

                            }

                        />



                        <button

                            onClick={handleAddDepartment}

                        >

                            Add Department

                        </button>



                    </>

                )

            }


        </section>

    );

}


export default DepartmentManager;