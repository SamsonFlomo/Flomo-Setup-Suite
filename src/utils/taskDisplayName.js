function taskDisplayName(task){


    switch(task.type){


        case "rename_computer":

            return "Rename Computer";



        case "create_user":

            return "Create User";



        case "install_software":

            return `Install ${task.data.software}`;



        case "install_printer":

            return `Install Printer`;



        case "join_domain":

            return "Join Domain";



        case "generate_report":

            return "Generate Report";



        default:

            return task.type;


    }


}


export default taskDisplayName;