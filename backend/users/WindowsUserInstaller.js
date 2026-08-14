import { spawn } from "child_process";

import {
    createUser,
    createAdministrator,
    verifyUser
} from "../powershell/users/UserCommands.js";


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


        return this.executePowerShell(
            script,
            username
        );

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


        return this.executePowerShell(
            script,
            username
        );

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


        return this.executePowerShell(
            script,
            username
        );

    }


    async executePowerShell(
        script,
        username
    ) {

        return new Promise(
            (resolve) => {

                const process =
                    spawn(
                        "powershell.exe",
                        [
                            "-NoProfile",
                            "-ExecutionPolicy",
                            "Bypass",
                            "-Command",
                            "-"
                        ],
                        {
                            windowsHide:
                                true
                        }
                    );


                let stdout = "";

                let stderr = "";


                process.stdout.on(
                    "data",
                    (data) => {

                        stdout +=
                            data.toString();

                    }
                );


                process.stderr.on(
                    "data",
                    (data) => {

                        stderr +=
                            data.toString();

                    }
                );


                process.on(
                    "error",
                    (error) => {

                        resolve({

                            success:
                                false,

                            realMode:
                                true,

                            user:
                                username,

                            errors:
                                error.message,

                            output:
                                stdout

                        });

                    }
                );


                process.on(
                    "close",
                    (code) => {

                        resolve({

                            success:
                                code === 0,

                            realMode:
                                true,

                            user:
                                username,

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

            }
        );

    }

}


export default new WindowsUserInstaller();