import {
    installNetworkPrinter,
    verifyPrinter
} from "../powershell/printers/PrinterCommands.js";

import ExecutionEngine
    from "../execution/ExecutionEngine.js";


class WindowsPrinterInstaller {


    async install(printer) {

        if (!printer) {

            return {

                success: false,

                errors:
                    "Printer information is missing"

            };

        }


        const printerName =
            printer.name ||
            printer.id ||
            "Unknown Printer";


        const printerType =
            printer.type ||
            "network";


        /*
         * Currently the Windows implementation
         * supports network printers.
         */

        if (
            printerType !== "network"
        ) {

            return {

                success: false,

                errors:
                    `Windows printer installation for type '${printerType}' is not implemented yet`

            };

        }


        const script =
            installNetworkPrinter(
                printer
            );


        const result =
            await ExecutionEngine.execute(
                script
            );


        return {

            ...result,

            printer:
                printerName

        };

    }


    async verify(printer) {

        if (!printer) {

            return {

                success: false,

                errors:
                    "Printer information is missing"

            };

        }


        const printerName =
            printer.name ||
            printer.id ||
            "Unknown Printer";


        const script =
            verifyPrinter(
                printer
            );


        const result =
            await ExecutionEngine.execute(
                script
            );


        return {

            ...result,

            printer:
                printerName

        };

    }

}


export default new WindowsPrinterInstaller();