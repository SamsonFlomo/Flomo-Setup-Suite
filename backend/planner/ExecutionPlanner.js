import TaskTypes from "./TaskTypes.js";

import {
    createTask
}
from "./TaskFactory.js";



export default function createExecutionPlan(setupData){


    const tasks = [];

    let id = 1;


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


    setupData.accounts.users.forEach(user=>{

        tasks.push(

            createTask(

                id++,

                TaskTypes.CREATE_USER,

                user

            )

        );

    });



    setupData.software.forEach(software=>{

        tasks.push(

            createTask(

                id++,

                TaskTypes.INSTALL_SOFTWARE,

                {
                    software
                }

            )

        );

    });



    setupData.printers.forEach(printer=>{

        tasks.push(

            createTask(

                id++,

                TaskTypes.INSTALL_PRINTER,

                {
                    printer
                }

            )

        );

    });



    if(setupData.computer.domain){

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



    if(setupData.options.generateReport){

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