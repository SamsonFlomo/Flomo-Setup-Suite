import { ipcMain } from "electron";

import powershellService from "../services/powershellService.js";


function registerExecutionIPC() {


    ipcMain.handle(
        "execution:start",
        async (event, data) => {


            console.log(
                "Execution requested"
            );


            const {
                script
            } = data;



            if (!script) {


                return {

                    success:false,

                    output:"",

                    errors:"No PowerShell script received"

                };


            }




            const result =
                await powershellService.execute(
                    script
                );



            return result;


        }
    );


}



export default registerExecutionIPC;
