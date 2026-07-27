import Card from "../common/Card";


function OrganizationCard({

    organization,

    onDelete,

    onEdit,

    onManageDepartments

}) {


    return (

        <section>


            <h3>
                {organization.name}
            </h3>


            <p>
                <strong>Code:</strong> {organization.code}
            </p>


            <p>
                <strong>Domain:</strong> {organization.domain || "Not configured"}
            </p>


            <p>
                <strong>Departments:</strong> {organization.departments.length}
            </p>



            <button

                onClick={() => onEdit(organization)}

            >

                Edit

            </button>



            <button

                onClick={() => onManageDepartments(organization.id)}

            >

                Manage Departments

            </button>



            <button

                onClick={() => onDelete(organization.id)}

            >

                Delete

            </button>


        </section>

    );

}


export default OrganizationCard;