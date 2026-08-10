import AutomationManager from "../../backend/automation/AutomationManager.js";

import ExecutionState from "./ExecutionState.js";

import ExecutionEnvironment from "../../backend/execution/ExecutionEnvironment.js";
import SimulationRunner from "../../backend/execution/SimulationRunner.js";

class ExecutionController {
  constructor() {
    this.state = ExecutionState.IDLE;

    this.tasks = [];

    this.currentIndex = 0;

    this.sender = null;

    this.results = [];
  }

  sendState() {
    if (!this.sender) {
      return;
    }

    this.sender.send("execution:state", {
      state: this.state,
    });
  }

  sendProgress(task, status) {
    if (!this.sender) {
      return;
    }

    this.sender.send("execution:progress", {
      type: "task",

      taskId: task.id,

      name: task.name,

      status,
    });
  }

  async execute(tasks, sender) {
    this.tasks = tasks;

    this.sender = sender;

    this.results = [];

    this.currentIndex = 0;

    this.state = ExecutionState.RUNNING;

    this.sendState();

    while (this.currentIndex < this.tasks.length) {
      await this.waitWhilePaused();

      if (this.state === ExecutionState.CANCELLED) {
        this.cancelRemainingTasks();

        break;
      }

      const task = this.tasks[this.currentIndex];

      const result = await this.runTask(task);

      this.results.push({
        task,

        result,
      });

      if (!result.success) {
        this.state = ExecutionState.FAILED;

        this.sendState();

        return {
          success: false,

          failedTask: task,

          results: this.results,
        };
      }

      this.currentIndex++;
    }

    if (this.state !== ExecutionState.CANCELLED) {
      this.state = ExecutionState.COMPLETED;
    }

    this.sendState();

    return {
      success: this.state === ExecutionState.COMPLETED,

      cancelled: this.state === ExecutionState.CANCELLED,

      results: this.results,
    };
  }

 async runTask(task) {

    this.sender.send(
        "execution:progress",
        {
            type: "task",

            taskId:
                task.id,

            name:
                task.name,

            status:
                "running",
        },
    );


    try {

        const automationTask =
            AutomationManager.createTask(
                task.type,
                task.data
            );


        if (
            !automationTask ||
            typeof automationTask.execute !== "function"
        ) {

            const result = {

                success: false,

                errors:
                    `Automation task for ${task.type} `
                    + `is not executable`

            };


            this.sender.send(
                "execution:progress",
                {
                    type: "task",

                    taskId:
                        task.id,

                    name:
                        task.name,

                    status:
                        "failed",

                    error:
                        result.errors
                }
            );


            return result;

        }


        const result =
            await automationTask.execute();


        this.sender.send(
            "execution:progress",
            {
                type: "task",

                taskId:
                    task.id,

                name:
                    task.name,

                status:
                    result.success
                        ? "success"
                        : "failed",

                output:
                    result.output ||
                    result.message ||
                    "",

                error:
                    result.errors ||
                    result.error ||
                    ""
            }
        );


        return result;


    } catch (error) {


        const result = {

            success: false,

            errors:
                error.message

        };


        this.sender.send(
            "execution:progress",
            {
                type: "task",

                taskId:
                    task.id,

                name:
                    task.name,

                status:
                    "failed",

                error:
                    error.message
            }
        );


        return result;

    }

} 

  cancelRemainingTasks() {
    for (
      let index = this.currentIndex + 1;
      index < this.tasks.length;
      index++
    ) {
      this.sendProgress(
        this.tasks[index],

        "cancelled",
      );
    }
  }

  async retry() {
    if (this.state !== ExecutionState.FAILED) {
      return {
        success: false,

        message: "No failed task to retry",
      };
    }

    const task = this.tasks[this.currentIndex];

    this.state = ExecutionState.RUNNING;

    this.sendState();

    const result = await this.runTask(task);

    if (result.success) {
      this.results.push({
        task,

        result,
      });

      this.currentIndex++;

      return this.executeRemaining();
    }

    this.state = ExecutionState.FAILED;

    this.sendState();

    return {
      success: false,

      result,
    };
  }

  async executeRemaining() {
    while (this.currentIndex < this.tasks.length) {
      await this.waitWhilePaused();

      if (this.state === ExecutionState.CANCELLED) {
        this.cancelRemainingTasks();

        break;
      }

      const task = this.tasks[this.currentIndex];

      const result = await this.runTask(task);

      this.results.push({
        task,

        result,
      });

      if (!result.success) {
        this.state = ExecutionState.FAILED;

        this.sendState();

        return {
          success: false,

          results: this.results,
        };
      }

      this.currentIndex++;
    }

    if (this.state !== ExecutionState.CANCELLED) {
      this.state = ExecutionState.COMPLETED;
    }

    this.sendState();

    return {
      success: this.state === ExecutionState.COMPLETED,

      cancelled: this.state === ExecutionState.CANCELLED,

      results: this.results,
    };
  }

  skip() {
    if (this.state !== ExecutionState.FAILED) {
      return {
        success: false,
      };
    }

    const failedTask = this.tasks[this.currentIndex];

    this.sendProgress(failedTask, "skipped");

    this.currentIndex++;

    this.state = ExecutionState.RUNNING;

    this.sendState();

    return this.executeRemaining();
  }

  cancel() {
    this.state = ExecutionState.CANCELLED;

    this.sendState();
  }

  pause() {
    if (this.state === ExecutionState.RUNNING) {
      this.state = ExecutionState.PAUSED;

      this.sendState();
    }
  }

  resume() {
    if (this.state === ExecutionState.PAUSED) {
      this.state = ExecutionState.RUNNING;

      this.sendState();
    }
  }

  async waitWhilePaused() {
    while (this.state === ExecutionState.PAUSED) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
}

export default new ExecutionController();
