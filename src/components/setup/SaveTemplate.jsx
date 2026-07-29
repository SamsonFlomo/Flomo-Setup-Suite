import { useState, useContext } from "react";

import { SetupContext } from "../../context/SetupContext";

import { TemplateContext } from "../../context/TemplateContext";

import { OrganizationContext } from "../../context/OrganizationContext";

function SaveTemplate() {
  const { setupData } = useContext(SetupContext);

  const { createTemplateFromSetup } = useContext(TemplateContext);

  const { organizations } = useContext(OrganizationContext);

  const [templateName, setTemplateName] = useState("");

  console.log("SETUP DATA", setupData);
  

function saveTemplate() {


    console.log(
        "Computer Data:",
        setupData.computer
    );


    console.log(
        "Organizations:",
        organizations
    );



    const organization = organizations.find(

        (org) =>

        org.id ===
        Number(
            setupData.computer.organization
        )

    );



    console.log(
        "Found Organization:",
        organization
    );



    const department =
        organization?.departments.find(

            (dept) =>

            dept.id ===
            Number(
                setupData.computer.department
            )

        );



    console.log(
        "Found Department:",
        department
    );



    if(!templateName){

        alert(
            "Please enter template name"
        );

        return;

    }



    if(!organization){

        alert(
            "Organization not found"
        );

        return;

    }



    if(!department){

        alert(
            "Department not found"
        );

        return;

    }



    createTemplateFromSetup(

        setupData,

        templateName,

        organization,

        department

    );



    setTemplateName("");



    alert(
        "Template saved successfully"
    );

}

  return (
    <section>
      <h2>Save Configuration Template</h2>

      <input
        placeholder="Template name"
        value={templateName}
        onChange={(event) => setTemplateName(event.target.value)}
      />

      <button onClick={saveTemplate}>Save Template</button>
    </section>
  );
}

export default SaveTemplate;
