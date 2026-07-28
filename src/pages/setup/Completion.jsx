import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { SetupContext } from "../../context/SetupContext";

import ROUTES from "../../constants/routes";


function Completion() {


    const { setupData } = useContext(SetupContext);

    const navigate = useNavigate();



    return (

        <section>


            <h1>
                Deployment Complete
            </h1>


            <p>
                Flomo Setup Suite completed the configuration process.
            </p>



            <h2>
                Computer
            </h2>


            <p>
                <strong>Name:</strong>{" "}
                {setupData.computer.name || "Not generated"}
            </p>



            <p>
                <strong>Profile:</strong>{" "}
                {setupData.profile?.title || "Not selected"}
            </p>




            <h2>
                Users Created
            </h2>


            {

                setupData.accounts.users.length === 0

                ?

                <p>
                    No users configured.
                </p>

                :

                setupData.accounts.users.map((user)=>(

                    <p key={user.id}>

                        {user.username} - {user.type}

                    </p>

                ))

            }



            <h2>
                Software Selected
            </h2>


            {

                setupData.software.length === 0

                ?

                <p>
                    No software selected.
                </p>

                :

                setupData.software.map((software)=>(

                    <p key={software}>

                        {software}

                    </p>

                ))

            }



            <h2>
                Printers
            </h2>


            {

                setupData.printers.length === 0

                ?

                <p>
                    No printers configured.
                </p>

                :

                setupData.printers.map((printer)=>(

                    <p key={printer}>

                        {printer}

                    </p>

                ))

            }



            <h2>
                Options
            </h2>


            <p>
                Windows Update:
                {" "}
                {
                    setupData.options.windowsUpdate
                    ?
                    "Enabled"
                    :
                    "Disabled"
                }
            </p>


            <p>
                Restart:
                {" "}
                {
                    setupData.options.restart
                    ?
                    "Enabled"
                    :
                    "Disabled"
                }
            </p>


            <p>
                Report:
                {" "}
                {
                    setupData.options.generateReport
                    ?
                    "Enabled"
                    :
                    "Disabled"
                }
            </p>



            <button

                onClick={()=>
                    navigate(
                        ROUTES.DASHBOARD
                    )
                }

            >

                Return Dashboard

            </button>



            <button

                onClick={()=>
                    navigate(
                        ROUTES.SETUP
                    )
                }

            >

                New Setup

            </button>



        </section>

    );

}


export default Completion;