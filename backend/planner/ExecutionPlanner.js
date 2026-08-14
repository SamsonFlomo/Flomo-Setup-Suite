import TaskTypes from "./TaskTypes.js";

import { createTask } from "./TaskFactory.js";


export default function createExecutionPlan(setupData) {

    const tasks = [];

    let id = 1;


    /*
     * RENAME COMPUTER
     */

    if (setupData.computer?.name) {

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


    /*
     * CONFIGURE NETWORK
     *
     * Create one network task when the user
     * has supplied network configuration.
     */

    const network = {

        ipAddress:
            setupData.computer?.ipAddress || "",

        subnetMask:
            setupData.computer?.subnetMask || "",

        gateway:
            setupData.computer?.gateway || "",

        dns:
            setupData.computer?.dns || "",

        workgroup:
            setupData.computer?.workgroup || ""

    };


    if (

        network.ipAddress ||

        network.subnetMask ||

        network.gateway ||

        network.dns ||

        network.workgroup

    ) {

        tasks.push(

            createTask(

                id++,

                TaskTypes.CONFIGURE_NETWORK,

                network

            )

        );

    }


    /*
     * CREATE USERS
     */

    setupData.accounts?.users?.forEach(

        (user) => {

            tasks.push(

                createTask(

                    id++,

                    TaskTypes.CREATE_USER,

                    user

                )

            );

        }

    );


    /*
     * INSTALL SOFTWARE
     */

    setupData.software?.forEach(

        (software) => {

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


    /*
     * INSTALL PRINTERS
     */

    setupData.printers?.forEach(

        (printer) => {

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


    /*
     * JOIN DOMAIN
     */

    if (setupData.computer?.domain) {

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


    /*
     * GENERATE REPORT
     */

    if (
        setupData.options?.generateReport
    ) {

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