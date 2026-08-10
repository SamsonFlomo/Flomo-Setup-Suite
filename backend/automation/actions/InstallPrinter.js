import PrinterInstaller
    from "../../printers/PrinterInstaller.js";

import {
    installNetworkPrinter,
    verifyPrinter
} from "../../powershell/printers/PrinterCommands.js";

import {
    isRealMode
} from "../../config/ExecutionMode.js";


class InstallPrinter {


    static async create(data) {

        return {

            type: "install_printer",

            data

        };

    }


    static async execute(data) {

        const printer =
            data?.printer ||
            data;


        if (!printer) {

            return {

                success: false,

                errors:
                    "Printer information is missing"

            };

        }


        /*
         * DEVELOPMENT / SIMULATION MODE
         *
         * Do not modify Windows.
         */

        if (!isRealMode()) {

            return PrinterInstaller.install(
                printer
            );

        }


        /*
         * REAL MODE
         *
         * Generate the PowerShell command.
         */

        if (
            printer.type === "network"
        ) {

            const script =
                installNetworkPrinter(
                    printer
                );


            return {

                success: true,

                realMode: true,

                printer,

                script

            };

        }


        return {

            success: false,

            errors:
                `Unsupported printer type: ${
                    printer.type || "unknown"
                }`

        };

    }


    static async verify(data) {

        const printer =
            data?.printer ||
            data;


        if (!printer) {

            return {

                success: false,

                errors:
                    "Printer information is missing"

            };

        }


        if (!isRealMode()) {

            return {

                success: true,

                simulated: true,

                message:
                    `Printer verification simulated for ${
                        printer.name ||
                        printer.id
                    }`

            };

        }


        return {

            success: true,

            realMode: true,

            script:
                verifyPrinter(
                    printer
                )

        };

    }

}


export default InstallPrinter;