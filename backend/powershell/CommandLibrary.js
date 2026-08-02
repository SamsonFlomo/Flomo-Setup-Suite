const CommandLibrary = {



    rename_computer(data){


        return `Rename-Computer -NewName "${data.name}"`;


    },




    create_user(data){


        return `
New-LocalUser "${data.username}" 
-Password (ConvertTo-SecureString "${data.password}" -AsPlainText -Force)
        `;


    },




    create_admin(data){


        return `
Add-LocalGroupMember 
-Group "Administrators" 
-Member "${data.username}"
        `;


    },




    install_software(data){


        return `
winget install ${data.software}
        `;


    },




    install_printer(data){


        return `
Write-Host "Installing printer ${data.printer}"
        `;


    },




    configure_network(data){


        return `
Write-Host "Configuring network ${JSON.stringify(data)}"
        `;


    },




    join_domain(data){


        return `
Add-Computer -DomainName "${data.domain}"
        `;


    },




    windows_update(){


        return `
Write-Host "Running Windows Update"
        `;


    },




    generate_report(){


        return `
Write-Host "Generating report"
        `;


    }



};


module.exports = CommandLibrary;