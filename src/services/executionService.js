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


}


export default new ExecutionService();