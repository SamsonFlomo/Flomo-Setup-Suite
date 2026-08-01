import getExecutionStatus from "../../monitor/ExecutionMonitor";


function TaskStatusDisplay({ tasks }){


    const status = getExecutionStatus(tasks);



    return (

        <section>

            <h2>
                Deployment Progress
            </h2>


            {tasks.map(task => (

                <div key={task.id}>


                    {task.status === "completed" && "✓ "}


                    {task.status === "running" && "⏳ "}


                    {task.status === "pending" && "○ "}


                    {task.title}


                    {" - "}


                    {task.status}


                </div>

            ))}



            <hr />


            <p>

                Completed:

                {" "}

                {status.completed}

                /

                {status.total}

            </p>



            <p>

                Progress:

                {" "}

                {status.progress}%

            </p>


        </section>

    );

}


export default TaskStatusDisplay;