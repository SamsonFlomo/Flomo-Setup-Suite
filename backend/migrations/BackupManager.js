export function createBackup(){

    const backup = {

        organizations:

            localStorage.getItem(
                "flomo_organizations"
            ),


        setupData:

            localStorage.getItem(
                "flomo_setup_data"
            ),


        templates:

            localStorage.getItem(
                "flomo_templates"
            ),


        deployments:

            localStorage.getItem(
                "flomo_deployments"
            ),


        created:

            new Date().toISOString()

    };


    localStorage.setItem(

        "flomo_backup",

        JSON.stringify(backup)

    );


    return backup;

}