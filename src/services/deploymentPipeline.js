import createExecutionPlan from "../../backend/planner/ExecutionPlanner";
import generateScript from "../../backend/powershell/ScriptGenerator";
import ExecutionService from "./executionService";

class DeploymentPipeline {
  async deploy(setupData) {
    try {
      const tasks = createExecutionPlan(setupData);

      const script = generateScript(tasks);
      console.log("Generated Script:");
      console.log(script);

      const result = await ExecutionService.start({
        tasks,

        script,
      });

      return {
        success: result.success,

        tasks,

        script,

        result,
      };
    } catch (error) {
      return {
        success: false,

        error: error.message,
      };
    }
  }
}

export default new DeploymentPipeline();
