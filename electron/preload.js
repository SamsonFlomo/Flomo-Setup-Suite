const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("fss", {
  deployments: {
    execute(data) {
      return ipcRenderer.invoke(
        "deployment:execute",

        data,
      );
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
    run(script) {
      return ipcRenderer.invoke(
        "execution:run",

        script,
      );
    },
  },

  powershell: {
    execute(script) {
      return ipcRenderer.invoke(
        "powershell:execute",

        script,
      );
    },
  },
});
