import { useContext } from "react";

import { DeploymentContext } from "../../context/DeploymentContext";


function RecentActivity() {


    const { deployments } =
        useContext(DeploymentContext);




    const recentDeployments = [...deployments]

        .reverse()

        .slice(0, 5);




    return (

        <section>


            <h2>
                Recent Activity
            </h2>



            {
                recentDeployments.length === 0

                ?

                (

                    <p>
                        No activity recorded yet.
                    </p>

                )

                :

                (

                    recentDeployments.map((deployment)=>(


                        <div key={deployment.id}>


                            <p>

                                <strong>
                                    {deployment.computer?.name || "Unknown Computer"}
                                </strong>

                            </p>



                            <p>

                                Status:
                                {" "}

                                {deployment.status}

                            </p>



                            <p>

                                Date:
                                {" "}

                                {
                                    new Date(
                                        deployment.date
                                    ).toLocaleString()
                                }

                            </p>


                            <hr />


                        </div>


                    ))

                )

            }


        </section>

    );

}


export default RecentActivity;
