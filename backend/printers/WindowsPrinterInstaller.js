import { spawn } from "child_process";

import {
    installNetworkPrinter,
    verifyPrinter
} from "../powershell/printers/PrinterCommands.js";


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


        return this.executePowerShell(
            script,
            printerName
        );

    }


    async executePowerShell(
        script,
        printerName
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

                            success: false,

                            realMode: true,

                            printer:
                                printerName,

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

                            printer:
                                printerName,

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


        return this.executePowerShell(
            script,
            printerName
        );

    }

}


export default new WindowsPrinterInstaller();