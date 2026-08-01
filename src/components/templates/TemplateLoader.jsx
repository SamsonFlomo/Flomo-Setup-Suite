import { useContext } from "react";

import { TemplateContext } from "../../context/TemplateContext";
import { SetupContext } from "../../context/SetupContext";


function TemplateLoader(){


    const {
        templates,
        loadTemplateIntoSetup
    }
    =
    useContext(TemplateContext);



    const {
        setSetupData
    }
    =
    useContext(SetupContext);



    function handleLoad(template){

        loadTemplateIntoSetup(
            template,
            setSetupData
        );

        alert(
            "Template loaded successfully."
        );

    }



    return (

        <section>


            <h2>
                Load Configuration Template
            </h2>



            {
                templates.length === 0 ? (

                    <p>
                        No templates available.
                    </p>

                ) : (

                    templates.map((template)=>(


                        <div key={template.id}>


                            <strong>
                                {template.name}
                            </strong>



                            <button
                                onClick={() =>
                                    handleLoad(template)
                                }
                            >
                                Load Template
                            </button>


                        </div>


                    ))

                )
            }


        </section>

    );

}


export default TemplateLoader;