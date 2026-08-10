import AutomationTask from "../AutomationTask.js";


class CreateUser {


    create(data){


        return new AutomationTask({


            id:
            "create-user",


            name:
            "Create User",


            type:
            "CREATE_USER",


            data,



            execute: async()=>{


                return {


                    success:true,


                    message:
                    `User creation simulated: ${data.username}`


                };


            }


        });


    }


}


export default new CreateUser();