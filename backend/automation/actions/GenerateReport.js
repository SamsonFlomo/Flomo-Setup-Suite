import AutomationTask from "../AutomationTask.js";

import SimulationRunner from "../../execution/SimulationRunner.js";

import {
    isSimulationMode
} from "../../config/ExecutionMode.js";


class GenerateReport {

    create(data) {

        return new AutomationTask({

            id:
                "generate-report",

            name:
                "Generate Report",

            type:
                "GENERATE_REPORT",

            data,

            execute:
                async () => {

                    /*
                     * SIMULATION MODE
                     */

                    if (isSimulationMode()) {

                        return SimulationRunner.run({

                            name:
                                "Generate deployment report"

                        });

                    }


                    /*
                     * REAL MODE
                     *
                     * Report generation will be
                     * connected to ReportGenerator
                     * later.
                     */

                    return {

                        success: false,

                        realMode: true,

                        errors:
                            "Real report generation is not implemented yet"

                    };

                }

        });

    }

}


export default new GenerateReport();