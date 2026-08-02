const powershellService =
require("./powershellService");



class ExecutionService {



    async execute(script){


        if(!script){


            return {


                success:false,

                output:"",

                errors:"Empty PowerShell script"


            };


        }





        try {


            const result =

                await powershellService.execute(
                    script
                );



            return result;



        } catch(error){



            return {


                success:false,

                output:"",

                errors:error.message


            };


        }



    }



}



module.exports = new ExecutionService();