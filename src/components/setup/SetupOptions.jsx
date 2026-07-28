import { useContext } from "react";

import { SetupContext } from "../../context/SetupContext";

function SetupOptions() {

    const { setupData, setSetupData } = useContext(SetupContext);



    function toggleOption(option) {

        setSetupData((previousData) => ({

            ...previousData,

            options: {

                ...previousData.options,

                [option]: !previousData.options[option]

            }

        }));

    }



    return (

        <section>

            <h2>Setup Options</h2>


            <label>

                <input

                    type="checkbox"

                    checked={setupData.options.windowsUpdate}

                    onChange={() => toggleOption("windowsUpdate")}

                />

                Install Windows Updates

            </label>


            <br />


            <label>

                <input

                    type="checkbox"

                    checked={setupData.options.restart}

                    onChange={() => toggleOption("restart")}

                />

                Restart After Setup

            </label>


            <br />


            <label>

                <input

                    type="checkbox"

                    checked={setupData.options.generateReport}

                    onChange={() => toggleOption("generateReport")}

                />

                Generate Setup Report

            </label>


        </section>

    );

}

export default SetupOptions;