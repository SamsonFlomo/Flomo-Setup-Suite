import { createContext, useState } from "react";


export const SetupContext = createContext();


export function SetupProvider({ children }) {

    const [setupData, setSetupData] = useState({

        profile: "",

        accounts: {
            administrators: [],
            users: []
        },

       computer: {

            company: "",

            department: "",

            type: "PC",

            number: "",

            name: "",

            domain: "",

            ipAddress: "",

            workgroup: ""

        }, 

        software: [],

        options: {
            windowsUpdate: false,
            restart: false,
            generateReport: true
        }

    });


    return (

        <SetupContext.Provider
            value={{
                setupData,
                setSetupData
            }}
        >

            {children}

        </SetupContext.Provider>

    );
}