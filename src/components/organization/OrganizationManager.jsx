import { useContext } from "react";

import { OrganizationContext } from "../../context/OrganizationContext";

import OrganizationForm from "./OrganizationForm";


function OrganizationManager(){

    const { organizations } =
        useContext(OrganizationContext);



    return (

        <section>


            <h2>
                Organizations
            </h2>


            <OrganizationForm />


            <hr />


            <h3>
                Existing Organizations
            </h3>



            {

                organizations.length === 0 ?

                (

                    <p>
                        No organizations added yet.
                    </p>

                )

                :

                (

                    organizations.map((organization)=>(


                        <div key={organization.id}>


                            <h4>
                                {organization.name}
                            </h4>


                            <p>
                                Code:
                                {organization.code}
                            </p>


                            <p>
                                Domain:
                                {organization.domain}
                            </p>


                        </div>


                    ))

                )

            }


        </section>

    );

}


export default OrganizationManager;