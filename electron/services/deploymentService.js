import createExecutionPlan from "../../backend/planner/ExecutionPlanner.js";


import generateScript from "../../backend/powershell/ScriptGenerator.js";


import executionService from "./executionService.js";



class DeploymentService {



    async deploy(setupData){



        try {



            const tasks =

                createExecutionPlan(
                    setupData
                );




            const script =

                generateScript(
                    tasks
                );




            const result =

                await executionService.execute(
                    script
                );





            return {


                success:
                    result.success,


                tasks,

                script,


                result



            };



        } catch(error){



            return {


                success:false,

                error:error.message


            };


        }



    }



}



export default new DeploymentService();