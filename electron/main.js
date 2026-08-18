import { app, BrowserWindow } from "electron";

import path from "path";

import { fileURLToPath } from "url";

import registerDeploymentIPC from "./ipc/deploymentIPC.js";
import registerExecutionIPC from "./ipc/executionIPC.js";
import registerPowerShellIPC from "./ipc/powershellIPC.js";

import powershellService
    from "./services/powershellService.js";

import ExecutionEngine
    from "../backend/execution/ExecutionEngine.js";


const __filename =
    fileURLToPath(import.meta.url);


const __dirname =
    path.dirname(__filename);


function createWindow() {

    const window =
        new BrowserWindow({

            width: 1200,

            height: 800,

            title:
                "Flomo Setup Suite",

            webPreferences: {

                preload:
                    path.join(
                        __dirname,
                        "preload.js"
                    ),

                contextIsolation:
                    true,

                nodeIntegration:
                    false

            }

        });


    window.loadURL(
        "http://localhost:5173"
    );

}


app.whenReady().then(() => {


    /*
     * Connect the backend execution engine
     * to the central PowerShell service.
     *
     * The backend does not need to know
     * how PowerShell is executed.
     */

    ExecutionEngine.setExecutor(
        (script) =>
            powershellService.execute(
                script
            )
    );


    registerDeploymentIPC();

    registerPowerShellIPC();

    registerExecutionIPC();

    createWindow();

});