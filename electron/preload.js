const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("fss", {
  deployments: {
    execute(data) {
      return ipcRenderer.invoke("deployment:execute", data);
    },

    getAll() {
      return ipcRenderer.invoke("deployment:getAll");
    },

    create(data) {
      return ipcRenderer.invoke("deployment:create", data);
    },

    getById(id) {
      return ipcRenderer.invoke("deployment:getById", id);
    },

    delete(id) {
      return ipcRenderer.invoke("deployment:delete", id);
    },
  },

  execution: {
    start(data) {
      return ipcRenderer.invoke("execution:start", data);
    },

    onProgress(callback) {
      const listener = (event, progress) => {
        callback(progress);
      };

      ipcRenderer.on("execution:progress", listener);

      return () => {
        ipcRenderer.removeListener("execution:progress", listener);
      };
    },
  },

  powershell: {
    execute(script) {
      return ipcRenderer.invoke("powershell:execute", script);
    },

    onProgress(callback) {
      ipcRenderer.on(
        "execution:progress",

        (event, progress) => {
          callback(progress);
        },
      );
    },
  },
});
