import { useState } from "react";


function TemplateEditor({
    template,
    onSave,
    onCancel
}){


    const [name,setName] =
        useState(template.name);



    function save(){


        onSave({

            ...template,

            name

        });


    }



    return (

        <section>


            <h3>
                Edit Template
            </h3>



            <input

                value={name}

                onChange={(event)=>
                    setName(event.target.value)
                }

            />


            <button
                onClick={save}
            >
                Save Changes
            </button>



            <button
                onClick={onCancel}
            >
                Cancel
            </button>


        </section>

    );


}


export default TemplateEditor;