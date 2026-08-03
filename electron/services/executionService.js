import powershellService from "./powershellService.js";



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



export default new ExecutionService();