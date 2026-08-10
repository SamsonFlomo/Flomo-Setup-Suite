import AutomationTask from "../AutomationTask.js";


class RenameComputer {


    create(data){


        return new AutomationTask({

            id:
            "rename-computer",


            name:
            "Rename Computer",


            type:
            "RENAME_COMPUTER",


            data,


            execute: async()=>{


                return {

                    success:true,

                    message:
                    `Computer rename simulated: ${data.newName}`

                };


            }


        });


    }


}


export default new RenameComputer();