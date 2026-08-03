const labels = {

    rename_computer:
        "Rename Computer",

    create_user:
        "Create User",

    create_admin:
        "Create Administrator",

    install_software:
        "Install Software",

    install_printer:
        "Install Printer",

    configure_network:
        "Configure Network",

    join_domain:
        "Join Domain",

    windows_update:
        "Windows Update",

    generate_report:
        "Generate Report"

};

export default function taskDisplayName(type){

    return labels[type] || type;

}