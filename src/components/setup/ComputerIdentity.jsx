import { useContext, useEffect } from "react";

import { SetupContext } from "../../context/SetupContext";
import { OrganizationContext } from "../../context/OrganizationContext";

import computerTypes from "../../data/computerTypes";

import generateComputerName from "../../utils/computerNameGenerator";


function ComputerIdentity() {

    const { setupData, setSetupData } = useContext(SetupContext);

    const { organizations } = useContext(OrganizationContext);



    const selectedOrganization =
        organizations.find(
            (organization) =>
                organization.id === setupData.computer.organization
        );



    function updateComputer(field, value) {

        setSetupData((previousData) => ({

            ...previousData,

            computer: {

                ...previousData.computer,

                [field]: value

            }

        }));

    }



    useEffect(() => {


        if (
            !selectedOrganization ||
            !setupData.computer.department ||
            !setupData.computer.type ||
            !setupData.computer.number
        ) {

            return;

        }



        const name = generateComputerName(

            selectedOrganization.code,

            setupData.computer.department,

            setupData.computer.type,

            setupData.computer.number

        );



        if(name !== setupData.computer.name){

            updateComputer("name", name);

        }


    }, [

        selectedOrganization,

        setupData.computer.department,

        setupData.computer.type,

        setupData.computer.number

    ]);



    return (

        <section>

            <h2>
                Computer Identity
            </h2>



            <label>
                Organization
            </label>


            <select

                value={setupData.computer.organization}

                onChange={(event)=>
                    updateComputer(
                        "organization",
                        event.target.value
                    )
                }

            >

                <option value="">
                    Select Organization
                </option>


                {organizations.map((organization)=>(

                    <option

                        key={organization.id}

                        value={organization.id}

                    >

                        {organization.name}

                    </option>

                ))}


            </select>



            <label>
                Department
            </label>


            <select

                value={setupData.computer.department}

                onChange={(event)=>
                    updateComputer(
                        "department",
                        event.target.value
                    )
                }

            >

                <option value="">
                    Select Department
                </option>


                {selectedOrganization?.departments?.map((department)=>(

                    <option

                        key={department.id}

                        value={department.id}

                    >

                        {department.name}

                    </option>

                ))}


            </select>



            <label>
                Computer Type
            </label>


            <select

                value={setupData.computer.type}

                onChange={(event)=>
                    updateComputer(
                        "type",
                        event.target.value
                    )
                }

            >

                {computerTypes.map((type)=>(

                    <option

                        key={type.id}

                        value={type.id}

                    >

                        {type.name}

                    </option>

                ))}


            </select>



            <label>
                Computer Number
            </label>


            <input

                type="text"

                value={setupData.computer.number}

                placeholder="001"

                onChange={(event)=>
                    updateComputer(
                        "number",
                        event.target.value
                    )
                }

            />



            <h3>
                Generated Name:
            </h3>


            <p>
                {setupData.computer.name}
            </p>


        </section>

    );

}


export default ComputerIdentity;