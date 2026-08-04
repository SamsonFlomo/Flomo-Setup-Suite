import ExecutionStatus from "./ExecutionStatus.js";

class TaskRunner {

    async run(tasks) {

        const results = [];

        for (const task of tasks) {

            results.push({

                id: task.id,

                type: task.type,

                status: ExecutionStatus.RUNNING,

                started: new Date().toISOString()

            });

            await new Promise(resolve => setTimeout(resolve, 300));

            results[results.length - 1] = {

                ...results[results.length - 1],

                status: ExecutionStatus.SUCCESS,

                finished: new Date().toISOString()

            };

        }

        return results;

    }

}

export default new TaskRunner();