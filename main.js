const { app, BrowserWindow } = require("electron");

function createWindow() {

    const window = new BrowserWindow({
        width: 1200,
        height: 800,
        title: "Flomo Setup Suite"
    });

    window.loadFile("index.html");

}

app.whenReady().then(() => {

    createWindow();

});