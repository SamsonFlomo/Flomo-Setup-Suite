const { app, BrowserWindow } = require("electron");
const path = require("path");

const registerDeploymentIPC =
require("./ipc/deploymentIPC");

const registerPowerShellIPC =
require("./ipc/powershellIPC");

const registerExecutionIPC =
require("./ipc/executionIPC");

function createWindow() {

    const window = new BrowserWindow({

        width: 1200,

        height: 800,

        title: "Flomo Setup Suite",

        webPreferences: {

            preload: path.join(__dirname, "preload.js"),

            contextIsolation: true,

            nodeIntegration: false

        }

    });

    window.loadURL("http://localhost:5173");

}

app.whenReady().then(() => {


    registerDeploymentIPC();

    registerPowerShellIPC();

    registerExecutionIPC();


    createWindow();


});