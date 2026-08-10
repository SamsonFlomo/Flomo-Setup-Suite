import RenameComputer from "./actions/RenameComputer.js";
import CreateUser from "./actions/CreateUser.js";
import InstallSoftware from "./actions/InstallSoftware.js";
import InstallPrinter from "./actions/InstallPrinter.js";


class AutomationManager {


    constructor() {

        this.actions = {

            rename_computer:
                RenameComputer,

            create_user:
                CreateUser,

            install_software:
                InstallSoftware,

            install_printer:
                InstallPrinter,

        };

    }


    getAutomation(type) {

        return this.actions[type];

    }


    createTask(type, data) {

        const action =
            this.getAutomation(type);


        if (!action) {

            throw new Error(
                `Unknown automation type: ${type}`
            );

        }


        /*
         * Preferred automation structure:
         *
         * Action.create(data)
         *
         * returns an executable task.
         */

        if (
            typeof action.create === "function"
        ) {

            return action.create(data);

        }


        /*
         * Some automation handlers may expose
         * execute(data) directly.
         *
         * Normalize them into the same task
         * interface used by ExecutionController.
         */

        if (
            typeof action.execute === "function"
        ) {

            return {

                async execute() {

                    return action.execute(data);

                }

            };

        }


        throw new Error(
            `Automation handler for ${type} `
            + `does not provide create() or execute()`
        );

    }

}


export default new AutomationManager();
