export function calculateProgress(tasks){

    if(!tasks.length){

        return 0;

    }


    const completed = tasks.filter(

        task => task.status === "completed"

    ).length;



    return Math.round(

        (completed / tasks.length) * 100

    );

}