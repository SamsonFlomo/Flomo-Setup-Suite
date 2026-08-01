export default class RecoveryManager{


    retry(task){


        return {

            ...task,

            status:"pending"

        };

    }



    skip(task){


        return {

            ...task,

            status:"skipped"

        };

    }



    stop(){


        return {

            status:"stopped"

        };

    }


}