import { createContext, useState } from "react";


export const OrganizationContext = createContext();


export function OrganizationProvider({ children }) {


    const [organizations, setOrganizations] = useState([]);



    return (

        <OrganizationContext.Provider

            value={{

                organizations,

                setOrganizations

            }}

        >

            {children}

        </OrganizationContext.Provider>

    );

}