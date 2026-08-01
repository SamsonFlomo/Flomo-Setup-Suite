import LogTypes from "./LogTypes";


export default class Logger {


    constructor(){

        this.logs = [];

    }



    add(type,message,data={}){


        const entry = {

            id: Date.now(),

            type,

            message,


            data,


            timestamp:

                new Date().toISOString()

        };


        this.logs.push(entry);


        return entry;

    }



    info(message,data){

        return this.add(

            LogTypes.INFO,

            message,

            data

        );

    }



    success(message,data){

        return this.add(

            LogTypes.SUCCESS,

            message,

            data

        );

    }



    error(message,data){

        return this.add(

            LogTypes.ERROR,

            message,

            data

        );

    }



    getLogs(){

        return this.logs;

    }


}