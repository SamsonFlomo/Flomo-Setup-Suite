import CommandLibrary from "./CommandLibrary.js";

import ScriptBuilder from "./ScriptBuilder.js";



function generateTaskScript(task){


    const commandGenerator =

        CommandLibrary[task.type];



    if(!commandGenerator){

        return "";

    }



    return commandGenerator(

        task.data

    );


}




function generateScript(tasks){


    const builder = new ScriptBuilder();



    tasks.forEach((task)=>{


        const command =

            generateTaskScript(task);



        builder.add(command);


    });



    return builder.build();


}




export {

    generateTaskScript

};



export default generateScript;