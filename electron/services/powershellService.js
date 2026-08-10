import { spawn } from "child_process";

import {
    isRealMode,
    getExecutionMode
} from "../../backend/config/ExecutionMode.js";


class PowerShellService {


    execute(script, onProgress = null) {


        const mode =
            getExecutionMode();


        /*
         * SIMULATION MODE
         *
         * Never start PowerShell.
         */

        if (!isRealMode()) {


            if (onProgress) {

                onProgress({

                    type: "system",

                    message:
                        "Simulation mode: PowerShell execution skipped",

                    status:
                        "success"

                });

            }


            return Promise.resolve({

                success: true,

                simulated: true,

                mode,

                exitCode: 0,

                output:
                    script || "",

                errors: ""

            });

        }


        /*
         * REAL MODE
         *
         * Actually execute PowerShell.
         */

        return new Promise((resolve) => {


            if (onProgress) {

                onProgress({

                    type: "system",

                    message:
                        "Real PowerShell execution started",

                    status:
                        "running"

                });

            }


            const process =
                spawn(

                    "powershell.exe",

                    [

                        "-NoProfile",

                        "-ExecutionPolicy",

                        "Bypass",

                        "-Command",

                        "-"

                    ]

                );


            let stdout = "";

            let stderr = "";


            process.stdout.on(

                "data",

                (data) => {

                    const output =
                        data.toString();


                    stdout += output;


                    if (onProgress) {

                        onProgress({

                            type: "output",

                            message:
                                output.trim(),

                            status:
                                "running"

                        });

                    }

                }

            );


            process.stderr.on(

                "data",

                (data) => {

                    const error =
                        data.toString();


                    stderr += error;


                    if (onProgress) {

                        onProgress({

                            type: "error",

                            message:
                                error.trim(),

                            status:
                                "running"

                        });

                    }

                }

            );


            process.on(

                "close",

                (code) => {


                    if (onProgress) {

                        onProgress({

                            type: "system",

                            message:
                                "Real PowerShell execution completed",

                            status:
                                code === 0
                                    ? "success"
                                    : "failed"

                        });

                    }


                    resolve({

                        success:
                            code === 0,

                        simulated:
                            false,

                        mode,

                        exitCode:
                            code,

                        output:
                            stdout,

                        errors:
                            stderr

                    });

                }

            );


            process.stdin.write(
                script
            );

            process.stdin.end();

        });

    }

}


export default new PowerShellService();