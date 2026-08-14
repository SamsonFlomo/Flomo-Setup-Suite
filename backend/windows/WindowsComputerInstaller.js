import PowerShellService
    from "../../electron/services/powershellService.js";

import {
    renameComputer,
    verifyComputerName
} from "../powershell/windows/WindowsCommands.js";


class WindowsComputerInstaller {

    async install(data) {

        if (!data) {

            return {

                success: false,

                errors:
                    "Computer information is missing"

            };

        }


        const newName =
            data.newName ||
            data.name;


        if (!newName) {

            return {

                success: false,

                errors:
                    "New computer name is required"

            };

        }


        const script =
            renameComputer({
                ...data,
                newName
            });


        return PowerShellService.execute(
            script
        );

    }


    async verify(data) {

        if (!data) {

            return {

                success: false,

                errors:
                    "Computer information is missing"

            };

        }


        const expectedName =
            data.newName ||
            data.name;


        if (!expectedName) {

            return {

                success: false,

                errors:
                    "Computer name is required"

            };

        }


        const script =
            verifyComputerName({
                name:
                    expectedName
            });


        return PowerShellService.execute(
            script
        );

    }

}


export default new WindowsComputerInstaller();