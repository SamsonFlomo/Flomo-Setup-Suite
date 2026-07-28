import { useContext, useEffect } from "react";

import { SetupContext } from "../../context/SetupContext";

import softwareList from "../../data/software";


function SoftwareSelection() {


    const {
        setupData,
        setSetupData
    } = useContext(SetupContext);



    const profileId = setupData.profile?.id;



    useEffect(()=>{


        if(!profileId){
            return;
        }


        const defaultSoftware = softwareList

            .filter((software)=>

                software.defaultProfiles.includes(profileId)

            )

            .map((software)=>

                software.id

            );



        setSetupData((previousData)=>({


            ...previousData,


            software: defaultSoftware



        }));



    },[profileId]);





    function toggleSoftware(id){


        setSetupData((previousData)=>{


            const exists =
                previousData.software.includes(id);



            return {


                ...previousData,


                software:

                    exists

                    ?

                    previousData.software.filter(
                        item => item !== id
                    )

                    :

                    [
                        ...previousData.software,
                        id
                    ]

            };


        });


    }





    return (

        <section>


            <h2>
                Software Selection
            </h2>



            {
                softwareList.map((software)=>(


                    <div key={software.id}>


                        <label>


                            <input

                                type="checkbox"

                                checked={
                                    setupData.software.includes(
                                        software.id
                                    )
                                }

                                onChange={()=>
                                    toggleSoftware(
                                        software.id
                                    )
                                }

                            />


                            {software.name}


                            {" "}
                            ({software.category})


                        </label>


                    </div>


                ))

            }



        </section>

    );

}


export default SoftwareSelection;