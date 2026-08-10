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
    onState(callback) {
      const listener = (event, state) => {
        callback(state);
      };

      ipcRenderer.on("execution:state", listener);

      return () => {
        ipcRenderer.removeListener("execution:state", listener);
      };
    },

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

    pause() {
      return ipcRenderer.invoke("execution:pause");
    },

    resume() {
      return ipcRenderer.invoke("execution:resume");
    },

    cancel() {
      return ipcRenderer.invoke("execution:cancel");
    },

    retry() {
      return ipcRenderer.invoke("execution:retry");
    },

    skip() {
      return ipcRenderer.invoke("execution:skip");
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
