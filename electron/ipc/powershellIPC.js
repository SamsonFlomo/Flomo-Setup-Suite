const { ipcMain } = require("electron");

const powershellService =
    require("../services/powershellService");



function registerPowerShellIPC(){



    ipcMain.handle(

        "powershell:execute",

        async (event, script) => {


            return await powershellService.execute(
                script
            );


        }

    );



}



module.exports = registerPowerShellIPC;