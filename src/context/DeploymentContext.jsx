import { createContext, useState, useEffect } from "react";

import storageService from "../services/storageService";


export const DeploymentContext = createContext();



export function DeploymentProvider({ children }) {


    const [deployments, setDeployments] = useState(

        storageService.loadDeployments()

    );



    useEffect(()=>{


        storageService.saveDeployments(

            deployments

        );


    }, [deployments]);




    function addDeployment(deployment){


        setDeployments((previousDeployments)=>[

            ...previousDeployments,

            deployment

        ]);


    }




    function clearDeployments(){


        setDeployments([]);


    }





    return (

        <DeploymentContext.Provider

            value={{

                deployments,

                addDeployment,

                clearDeployments

            }}

        >

            {children}

        </DeploymentContext.Provider>

    );

}