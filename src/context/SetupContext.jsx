import { createContext, useState, useEffect } from "react";

import storageService from "../services/storageService";


export const SetupContext = createContext();



const defaultSetupData = {

    profile: null,


    accounts: {

        administrators: [],

        users: []

    },


    computer: {

        organization: "",

        department: "",

        type: "PC",

        number: "",

        name: "",

        domain: "",

        ipAddress: "",

        workgroup: ""

    },


    software: [],

    printers: [],


    options: {

        windowsUpdate: false,

        restart: false,

        generateReport: true

    }

};





export function SetupProvider({ children }) {



    const [setupData, setSetupData] = useState(

        storageService.loadSetupData(defaultSetupData)

    );





    useEffect(() => {


        storageService.saveSetupData(

            setupData

        );


    }, [setupData]);







    function applyProfile(profile) {


        if (!profile) {

            return;

        }



        setSetupData((previousData) => ({


            ...previousData,


            profile: profile,



            computer: {


                ...previousData.computer,


                domain:

                    profile.settings.domainJoin

                    ? "enabled"

                    : "",



                workgroup:

                    !profile.settings.domainJoin

                    ? "WORKGROUP"

                    : ""

            },



            software:


                profile.settings.installOffice

                ?

                [

                    "Microsoft Office"

                ]

                :

                [],



            accounts: {


                ...previousData.accounts,



                users:


                    profile.settings.createStandardUser

                    ?


                    [

                        {

                            id: Date.now(),

                            name: "Standard User"

                        }

                    ]

                    :


                    []

            }



        }));

    }






    return (


        <SetupContext.Provider


            value={{

                setupData,

                setSetupData,

                applyProfile

            }}


        >


            {children}


        </SetupContext.Provider>


    );

}