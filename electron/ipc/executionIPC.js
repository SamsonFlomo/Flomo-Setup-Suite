const { ipcMain } = require("electron");


const executionService =
require("../services/executionService");




function registerExecutionIPC(){



    ipcMain.handle(

        "execution:run",

        async(event, script)=>{


            return await executionService.execute(

                script

            );


        }

    );



}



module.exports = registerExecutionIPC;