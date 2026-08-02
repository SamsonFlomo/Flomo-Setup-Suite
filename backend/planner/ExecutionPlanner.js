const TaskTypes =
require("./TaskTypes");

const {
    createTask
} =
require("./TaskFactory");



function createExecutionPlan(setupData){


const tasks = [];

let id = 1;



// Computer Name

if(setupData.computer.name){


tasks.push(

createTask(

id++,

TaskTypes.RENAME_COMPUTER,

{

name:

setupData.computer.name

}

)

);


}



// Users

setupData.accounts.users.forEach(
user=>{


tasks.push(

createTask(

id++,

TaskTypes.CREATE_USER,

user

)

);


}

);



// Software

setupData.software.forEach(
software=>{


tasks.push(

createTask(

id++,

TaskTypes.INSTALL_SOFTWARE,

{

software

}

)

);


}

);



// Printers

setupData.printers.forEach(
printer=>{


tasks.push(

createTask(

id++,

TaskTypes.INSTALL_PRINTER,

{

printer

}

)

);


}

);



// Domain

if(
setupData.computer.domain
){


tasks.push(

createTask(

id++,

TaskTypes.JOIN_DOMAIN,

{

domain:

setupData.computer.domain

}

)

);


}



// Report

if(
setupData.options.generateReport
){


tasks.push(

createTask(

id++,

TaskTypes.GENERATE_REPORT,

{}

)

);


}



return tasks;


}