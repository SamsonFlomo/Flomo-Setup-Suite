import createExecutionPlan from "../../backend/planner/ExecutionPlanner.js";

import executionService from "./executionService.js";


class DeploymentPipeline {


  async deploy(setupData){


    try{


      const tasks =
        createExecutionPlan(
          setupData
        );



      const result =
        await executionService.start({

          tasks

        });



      return {


        success:
          result.success,


        tasks,


        result



      };



    }catch(error){



      return {


        success:false,


        error:
          error.message


      };


    }


  }


}



export default new DeploymentPipeline();
