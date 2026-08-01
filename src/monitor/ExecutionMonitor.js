import { calculateProgress } from "./ProgressCalculator";


export default function getExecutionStatus(tasks){


    return {

        total:

            tasks.length,


        completed:

            tasks.filter(

                task => task.status === "completed"

            ).length,


        running:

            tasks.find(

                task => task.status === "running"

            ),


        progress:

            calculateProgress(tasks)

    };

}