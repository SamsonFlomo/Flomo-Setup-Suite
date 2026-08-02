const CommandLibrary =
require("./CommandLibrary");


const ScriptBuilder =
require("./ScriptBuilder");



function generateScript(tasks){

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



module.exports = generateScript;