const profiles = [

    {
        id: "personal",

        title: "Personal Computer",

        description:
            "Configure a personal or home computer.",


        category: "personal",


        settings: {

            domainJoin: false,

            createStandardUser: true,

            installOffice: false,

            networkMode: "dhcp"

        }

    },



    {
        id: "company-local",

        title: "Company Local Computer",

        description:
            "Configure a company computer using local accounts.",


        category: "company",


        settings: {

            domainJoin: false,

            createStandardUser: true,

            installOffice: true,

            networkMode: "dhcp"

        }

    },



    {
        id: "company-domain",

        title: "Company Domain Computer",

        description:
            "Configure a company computer joined to Active Directory.",


        category: "company",


        settings: {

            domainJoin: true,

            createStandardUser: true,

            installOffice: true,

            networkMode: "dhcp"

        }

    }

];


export default profiles;