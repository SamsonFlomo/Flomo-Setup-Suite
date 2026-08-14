import AutomationTask from "../AutomationTask.js";

import WindowsUserInstaller
    from "../../users/WindowsUserInstaller.js";

import {
    isRealMode
} from "../../config/ExecutionMode.js";


class CreateUser {

    create(data) {

        return new AutomationTask({

            id:
                "create-user",

            name:
                "Create User",

            type:
                "CREATE_USER",

            data,

            execute:
                async () => {

                    if (!data) {

                        return {

                            success: false,

                            errors:
                                "User information is missing"

                        };

                    }


                    const username =
                        data.username ||
                        data.name;


                    if (!username) {

                        return {

                            success: false,

                            errors:
                                "Username is required"

                        };

                    }


                    /*
                     * SIMULATION MODE
                     *
                     * No Windows changes are made.
                     */

                    if (!isRealMode()) {

                        return {

                            success: true,

                            simulated: true,

                            user:
                                username,

                            message:
                                `User creation simulated: ${username}`

                        };

                    }


                    /*
                     * REAL WINDOWS MODE
                     */

                    return WindowsUserInstaller.install({

                        ...data,

                        username

                    });

                }

        });

    }

}


export default new CreateUser();