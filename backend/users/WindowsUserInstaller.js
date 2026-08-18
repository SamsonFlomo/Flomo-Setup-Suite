import {
    createUser,
    createAdministrator,
    verifyUser
} from "../powershell/users/UserCommands.js";

import ExecutionEngine
    from "../execution/ExecutionEngine.js";


class WindowsUserInstaller {


    async install(user) {

        if (!user) {

            return {

                success: false,

                errors:
                    "User information is missing"

            };

        }


        const username =
            user.username ||
            user.name;


        if (!username) {

            return {

                success: false,

                errors:
                    "Username is required"

            };

        }


        const script =
            createUser({

                ...user,

                username

            });


        const result =
            await ExecutionEngine.execute(
                script
            );


        return {

            ...result,

            user:
                username

        };

    }


    async createAdministrator(user) {

        if (!user) {

            return {

                success: false,

                errors:
                    "User information is missing"

            };

        }


        const username =
            user.username ||
            user.name;


        if (!username) {

            return {

                success: false,

                errors:
                    "Username is required"

            };

        }


        const script =
            createAdministrator({

                ...user,

                username

            });


        const result =
            await ExecutionEngine.execute(
                script
            );


        return {

            ...result,

            user:
                username

        };

    }


    async verify(user) {

        if (!user) {

            return {

                success: false,

                errors:
                    "User information is missing"

            };

        }


        const username =
            user.username ||
            user.name;


        if (!username) {

            return {

                success: false,

                errors:
                    "Username is required"

            };

        }


        const script =
            verifyUser({

                ...user,

                username

            });


        const result =
            await ExecutionEngine.execute(
                script
            );


        return {

            ...result,

            user:
                username

        };

    }

}


export default new WindowsUserInstaller();