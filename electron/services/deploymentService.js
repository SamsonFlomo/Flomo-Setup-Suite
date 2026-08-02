const createExecutionPlan =
require("../../backend/planner/ExecutionPlanner");


const generateScript =
require("../../backend/powershell/ScriptGenerator");


const executionService =
require("./executionService");



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



module.exports = new DeploymentService();