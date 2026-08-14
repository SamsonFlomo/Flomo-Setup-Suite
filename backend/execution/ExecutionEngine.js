class ExecutionEngine {

    async execute(script) {

        if (!script) {

            return {

                success: false,

                output: "",

                errors:
                    "No script provided"

            };

        }


        try {

            /*
             * PowerShell execution is handled by
             * the Electron bridge.
             *
             * The renderer exposes:
             *
             * window.fss.powershell.execute()
             */

            if (
                typeof window === "undefined" ||
                !window.fss ||
                !window.fss.powershell ||
                typeof window.fss.powershell.execute !== "function"
            ) {

                return {

                    success: false,

                    output: "",

                    errors:
                        "PowerShell execution bridge is unavailable"

                };

            }


            const result =
                await window.fss.powershell.execute(
                    script
                );


            return result;


        }
        catch (error) {

            return {

                success: false,

                output: "",

                errors:
                    error.message

            };

        }

    }

}


export default new ExecutionEngine();