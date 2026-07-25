import { useState, useContext, useEffect } from "react";

import { OrganizationContext } from "../../context/OrganizationContext";


function OrganizationForm({ editingOrganization, clearEdit }) {


    const {

        addOrganization,

        updateOrganization

    } = useContext(OrganizationContext);



    const initialState = {

        name: "",

        code: "",

        domain: "",

        description: ""

    };



    const [formData, setFormData] = useState(initialState);



    useEffect(()=>{


        if(editingOrganization){

            setFormData({

                name: editingOrganization.name,

                code: editingOrganization.code,

                domain: editingOrganization.domain,

                description: editingOrganization.description

            });

        }


    },[editingOrganization]);




    function handleChange(event){


        const {name,value}=event.target;


        setFormData((previousData)=>({

            ...previousData,

            [name]:value

        }));

    }




    function handleSubmit(event){


        event.preventDefault();



        if(editingOrganization){


            updateOrganization(

                editingOrganization.id,

                formData

            );


            clearEdit();


        }

        else{


            addOrganization({

                id:Date.now(),

                ...formData,

                departments:[]

            });


        }



        setFormData(initialState);


    }




    return (

        <form onSubmit={handleSubmit}>


            <h3>

                {
                    editingOrganization

                    ?

                    "Edit Organization"

                    :

                    "Add Organization"

                }

            </h3>



            <input

                name="name"

                placeholder="Organization Name"

                value={formData.name}

                onChange={handleChange}

            />



            <input

                name="code"

                placeholder="Organization Code"

                value={formData.code}

                onChange={handleChange}

            />



            <input

                name="domain"

                placeholder="Domain"

                value={formData.domain}

                onChange={handleChange}

            />



            <textarea

                name="description"

                placeholder="Description"

                value={formData.description}

                onChange={handleChange}

            />



            <button type="submit">

                {
                    editingOrganization

                    ?

                    "Save Changes"

                    :

                    "Add Organization"

                }

            </button>



        </form>

    );

}


export default OrganizationForm;