import executionProgressService from "./executionProgressService";


class ExecutionBridge {


    initialize(){


        if(
            window.fss &&
            window.fss.execution &&
            window.fss.execution.onProgress
        ){


            window.fss.execution.onProgress(

                (progress)=>{


                    executionProgressService.notify(

                        progress

                    );


                }

            );


        }


    }


}


export default new ExecutionBridge();