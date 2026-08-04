import { ipcMain } from "electron";

import powershellService from "../services/powershellService.js";
import { generateTaskScript } from "../../backend/powershell/ScriptGenerator.js";

function registerExecutionIPC() {
  ipcMain.handle("execution:start", async (event, data) => {
    const { tasks } = data;

    if (!tasks || tasks.length === 0) {
      return {
        success: false,

        output: "",

        errors: "No tasks received",
      };
    }

    const results = [];

    for (const task of tasks) {
      event.sender.send(
        "execution:progress",

        {
          type: "task",

          taskId: task.id,

          name: task.name,

          status: "running",
        },
      );

      const script = generateTaskScript(task);

      const result = await powershellService.execute(script);

      results.push({
        task,

        result,
      });

      event.sender.send(
        "execution:progress",

        {
          type: "task",

          taskId: task.id,

          name: task.name,

          status: result.success ? "success" : "failed",

          output: result.output,

          error: result.errors,
        },
      );
    }

    return {
      success: results.every((item) => item.result.success),

      results,
    };
  });
}

export default registerExecutionIPC;
