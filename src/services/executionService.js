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

            errors:
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





    subscribeState(callback){


        if(
            window.fss &&
            window.fss.execution
        ){

            return window.fss.execution.onState(
                callback
            );

        }


        return ()=>{};


    }





    pause(){


        return window.fss.execution.pause();


    }





    resume(){


        return window.fss.execution.resume();


    }





    cancel(){


        return window.fss.execution.cancel();


    }





    retry(){


        return window.fss.execution.retry();


    }





    skip(){


        return window.fss.execution.skip();


    }



}



export default new ExecutionService();