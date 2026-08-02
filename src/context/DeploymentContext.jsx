import {
    createContext,
    useState,
    useEffect
} from "react";


import deploymentService from "../services/deploymentService";



export const DeploymentContext = createContext();




export function DeploymentProvider({ children }) {



    const [deployments, setDeployments] = useState([]);



    /*
        Load deployments when application starts
    */

    useEffect(()=>{


        async function loadDeployments(){


            const data =
                await deploymentService.getAll();



            setDeployments(data || []);


        }



        loadDeployments();



    }, []);







    async function addDeployment(deployment){



        const savedDeployment =
            await deploymentService.create(
                deployment
            );



        setDeployments((previous)=>[

            ...previous,

            savedDeployment

        ]);



    }







    async function deleteDeployment(id){



        await deploymentService.delete(
            id
        );



        setDeployments((previous)=>

            previous.filter(

                deployment =>
                    deployment.id !== id

            )

        );


    }








    function clearDeployments(){


        setDeployments([]);


    }








    return (


        <DeploymentContext.Provider


            value={{


                deployments,


                addDeployment,


                deleteDeployment,


                clearDeployments



            }}



        >


            {children}


        </DeploymentContext.Provider>


    );


}