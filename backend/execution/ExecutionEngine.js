class ExecutionEngine {



    async execute(script) {



        if (!script) {


            return {


                success: false,

                output: "",

                errors: "No script provided"

            };


        }





        try {


            const result =

                await window.fss.powershell.execute(

                    script

                );



            return result;



        } catch(error) {



            return {


                success: false,

                output: "",

                errors: error.message


            };


        }



    }



}



export default new ExecutionEngine();