import { ipcMain } from "electron";

import powershellService from "../services/powershellService.js";

function registerPowerShellIPC() {
  ipcMain.handle(
    "powershell:execute",

    async (event, script) => {
      return await powershellService.execute(script);
    },
  );
}

export default registerPowerShellIPC;
