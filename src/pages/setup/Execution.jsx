import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import ROUTES from "../../constants/routes";

import { DeploymentContext } from "../../context/DeploymentContext";
import { SetupContext } from "../../context/SetupContext";
import { OrganizationContext } from "../../context/OrganizationContext";


function Execution() {


  const navigate = useNavigate();


  const { addDeployment } = useContext(DeploymentContext);


  const { setupData } = useContext(SetupContext);


  const { organizations } = useContext(OrganizationContext);




  const selectedOrganization =
    organizations.find(
      (org) =>
        org.id === Number(
          setupData.computer.organization
        )
    );



  const selectedDepartment =
    selectedOrganization?.departments.find(
      (dept) =>
        dept.id === Number(
          setupData.computer.department
        )
    );





  const [steps, setSteps] = useState([

    {
      id: 1,
      name: "Preparing configuration",
      status: "pending",
    },

    {
      id: 2,
      name: "Creating user accounts",
      status: "pending",
    },

    {
      id: 3,
      name: "Installing software",
      status: "pending",
    },

    {
      id: 4,
      name: "Configuring network settings",
      status: "pending",
    },

    {
      id: 5,
      name: "Generating report",
      status: "pending",
    },

  ]);





  useEffect(() => {


    let currentStep = 0;



    const timer = setInterval(() => {


      if (currentStep >= steps.length) {


        clearInterval(timer);



        addDeployment({


          id: Date.now(),



          computer: {


            name:
              setupData.computer.name,



            organization: {

              id:
                selectedOrganization?.id,

              name:
                selectedOrganization?.name,

              code:
                selectedOrganization?.code,

            },



            department: {

              id:
                selectedDepartment?.id,

              name:
                selectedDepartment?.name,

            },



            type:
              setupData.computer.type,



            number:
              setupData.computer.number,



            domain:
              setupData.computer.domain,



            ipAddress:
              setupData.computer.ipAddress,



            workgroup:
              setupData.computer.workgroup,

          },



          profile:
            setupData.profile?.title,



          users:
            setupData.accounts.users,



          administrators:
            setupData.accounts.administrators,



          software:
            setupData.software,



          printers:
            setupData.printers,



          options:
            setupData.options,



          status:
            "Successful",



          date:
            new Date().toISOString(),

        });




        setTimeout(() => {


          navigate(
            ROUTES.COMPLETION
          );


        }, 1000);



        return;


      }





      setSteps((previousSteps) =>


        previousSteps.map((step, index) => {


          if (index === currentStep) {


            return {

              ...step,

              status: "completed",

            };


          }


          return step;


        })


      );



      currentStep++;



    }, 1500);




    return () => clearInterval(timer);



  }, []);





  return (

    <section>


      <h1>
        Deployment Execution
      </h1>



      <p>
        Flomo Setup Suite is applying configuration.
      </p>



      {
        steps.map((step) => (

          <div key={step.id}>


            <strong>
              {step.name}
            </strong>


            {" - "}


            {step.status}


          </div>

        ))
      }



    </section>

  );

}


export default Execution;