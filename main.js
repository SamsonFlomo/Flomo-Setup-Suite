const { app, BrowserWindow } = require("electron");

function createWindow() {

    const window = new BrowserWindow({
        width: 1200,
        height: 800,
        title: "Flomo Setup Suite"
    });

    window.loadURL("http://localhost:5173");
}

app.whenReady().then(() => {

    createWindow();

});