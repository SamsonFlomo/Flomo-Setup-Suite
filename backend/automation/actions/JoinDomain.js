import AutomationTask from "../AutomationTask.js";

import SimulationRunner from "../../execution/SimulationRunner.js";

import {
    isSimulationMode
} from "../../config/ExecutionMode.js";


class JoinDomain {

    create(data) {

        return new AutomationTask({

            id:
                "join-domain",

            name:
                "Join Domain",

            type:
                "JOIN_DOMAIN",

            data,

            execute:
                async () => {

                    const domain =
                        data?.domain;


                    if (!domain) {

                        return {

                            success: false,

                            errors:
                                "Domain name is missing"

                        };

                    }


                    /*
                     * SIMULATION MODE
                     */

                    if (isSimulationMode()) {

                        return SimulationRunner.run({

                            name:
                                `Join domain ${domain}`

                        });

                    }


                    /*
                     * REAL MODE
                     *
                     * Real domain joining will be
                     * implemented later.
                     */

                    return {

                        success: false,

                        realMode: true,

                        errors:
                            "Real domain joining is not implemented yet"

                    };

                }

        });

    }

}


export default new JoinDomain();