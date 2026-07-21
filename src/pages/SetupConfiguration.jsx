import { useContext } from "react";

import { SetupContext } from "../context/SetupContext";


function SetupConfiguration() {

    const { setupData } = useContext(SetupContext);


    return (
        <div>

            <h1>
                Setup Configuration
            </h1>


            <p>
                Selected Profile:
                {" "}
                {setupData.profile}
            </p>


        </div>
    );
}


export default SetupConfiguration;