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
            name: "",
            domain: "",
            ipAddress: ""
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