export default class ErrorHandler {


    constructor(){

        this.errors = [];

    }



    capture(task,error){


        const errorRecord = {

            id: Date.now(),

            taskId: task.id,

            taskName: task.title,


            message:
                error.message || error,


            timestamp:
                new Date().toISOString(),


            retryCount: 0,


            status:"failed"

        };


        this.errors.push(errorRecord);


        return errorRecord;

    }



    getErrors(){

        return this.errors;

    }


}