import AutomationTask from "../AutomationTask.js";

import PrinterInstaller
    from "../../printers/PrinterInstaller.js";

import WindowsPrinterInstaller
    from "../../printers/WindowsPrinterInstaller.js";

import {
    isRealMode
} from "../../config/ExecutionMode.js";


class InstallPrinter {


    create(data) {

        return new AutomationTask({

            id:
                "install-printer",

            name:
                "Install Printer",

            type:
                "INSTALL_PRINTER",

            data,

            execute:
                async () => {

                    return InstallPrinter.execute(
                        data
                    );

                }

        });

    }


    static async execute(data) {

        let printer =
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
         * Some setup selections contain only
         * the printer ID.
         *
         * Normalize that value before
         * passing it to the installer.
         */

        if (
            typeof printer === "string"
        ) {

            printer = {

                id:
                    printer,

                name:
                    printer

            };

        }


        /*
         * SIMULATION MODE
         *
         * This remains the default.
         *
         * No Windows changes are made.
         */

        if (
            !isRealMode()
        ) {

            return PrinterInstaller.install(
                printer
            );

        }


        /*
         * REAL WINDOWS MODE
         *
         * Use the Windows-specific installer.
         */

        return WindowsPrinterInstaller.install(
            printer
        );

    }


    async verify(data) {

        let printer =
            data?.printer ||
            data;


        if (!printer) {

            return {

                success: false,

                errors:
                    "Printer information is missing"

            };

        }


        if (
            typeof printer === "string"
        ) {

            printer = {

                id:
                    printer,

                name:
                    printer

            };

        }


        /*
         * Simulation verification.
         */

        if (
            !isRealMode()
        ) {

            return {

                success: true,

                simulated: true,

                printer:
                    printer.name ||
                    printer.id,

                message:
                    `Printer verification simulated for ${
                        printer.name ||
                        printer.id
                    }`

            };

        }


        /*
         * Real Windows verification.
         */

        return WindowsPrinterInstaller.verify(
            printer
        );

    }

}


export default new InstallPrinter();