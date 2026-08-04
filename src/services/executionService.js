class ExecutionService {


    async start(data){


        if(
            window.fss &&
            window.fss.execution
        ){

            return await window.fss.execution.start(
                data
            );

        }


        return {

            success:false,

            message:
            "Electron unavailable"

        };


    }





    subscribeProgress(callback){


        if(
            window.fss &&
            window.fss.execution
        ){

            return window.fss.execution.onProgress(
                callback
            );

        }



        return ()=>{};


    }


}



export default new ExecutionService();