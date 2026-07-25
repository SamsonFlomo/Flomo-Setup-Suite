const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("fss", {

    version: "1.0.0"

});