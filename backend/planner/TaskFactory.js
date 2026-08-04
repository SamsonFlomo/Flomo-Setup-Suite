import TaskTypes from "./TaskTypes.js";


const TaskNames = {


    [TaskTypes.RENAME_COMPUTER]:
        "Rename Computer",


    [TaskTypes.CREATE_USER]:
        "Create User Account",


    [TaskTypes.CREATE_ADMIN]:
        "Create Administrator Account",


    [TaskTypes.INSTALL_SOFTWARE]:
        "Install Software",


    [TaskTypes.INSTALL_PRINTER]:
        "Install Printer",


    [TaskTypes.CONFIGURE_NETWORK]:
        "Configure Network",


    [TaskTypes.JOIN_DOMAIN]:
        "Join Domain",


    [TaskTypes.WINDOWS_UPDATE]:
        "Windows Update",


    [TaskTypes.GENERATE_REPORT]:
        "Generate Report"


};




export function createTask(
    id,
    type,
    data
){


    return {


        id,


        type,


        name:
        TaskNames[type] || type,


        status:
        "pending",


        data


    };


}