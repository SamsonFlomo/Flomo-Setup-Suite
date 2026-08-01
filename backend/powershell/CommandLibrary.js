import CommandLibrary from "./CommandLibrary";

import ScriptBuilder from "./ScriptBuilder";



export default function generateScript(tasks){


    const builder = new ScriptBuilder();



    tasks.forEach((task)=>{


        const commandGenerator =

            CommandLibrary[task.type];



        if(commandGenerator){


            const command =

                commandGenerator(task.data);



            builder.add(command);


        }


    });



    return builder.build();


}