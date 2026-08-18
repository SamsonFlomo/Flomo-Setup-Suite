class ExecutionEngine {

    constructor() {

        this.executor = null;

    }


    setExecutor(executor) {

        if (typeof executor !== "function") {

            throw new TypeError(
                "PowerShell executor must be a function"
            );

        }

        this.executor = executor;

    }


    async execute(script) {

        if (!script) {

            return {

                success: false,

                output: "",

                errors:
                    "No script provided"

            };

        }


        if (!this.executor) {

            return {

                success: false,

                output: "",

                errors:
                    "PowerShell executor is not configured"

            };

        }


        try {

            return await this.executor(
                script
            );

        } catch (error) {

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