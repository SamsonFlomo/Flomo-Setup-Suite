import AutomationTask from "../AutomationTask.js";

import {
    isSimulationMode
} from "../../config/ExecutionMode.js";

import {
    configureNetwork
} from "../../powershell/networking/NetworkCommands.js";


class ConfigureNetwork {

    create(data) {

        return new AutomationTask({

            id:
                "configure-network",

            name:
                "Configure Network",

            type:
                "CONFIGURE_NETWORK",

            data,

            execute:
                async () => {

                    if (!data) {

                        return {

                            success: false,

                            errors:
                                "Network configuration is missing"

                        };

                    }


                    /*
                     * Generate the PowerShell command.
                     */

                    let script;

                    try {

                        script =
                            configureNetwork(
                                data
                            );

                    }
                    catch (error) {

                        return {

                            success: false,

                            errors:
                                error.message

                        };

                    }


                    /*
                     * SIMULATION MODE
                     *
                     * Generate the script but do not
                     * execute it.
                     */

                    if (isSimulationMode()) {

                        return {

                            success: true,

                            simulated: true,

                            network:
                                data,

                            script,

                            message:
                                "Network configuration simulated successfully."

                        };

                    }


                    /*
                     * REAL MODE
                     *
                     * Real PowerShell execution will
                     * be connected through the execution
                     * service.
                     */

                    return {

                        success: false,

                        errors:
                            "Real Windows network execution is not connected yet.",

                        script

                    };

                }

        });

    }

}


export default new ConfigureNetwork();