const deploymentService = {


    async getAll(){

        if(window.fss?.deployments){

            return await window.fss.deployments.getAll();

        }


        return [];

    },





    async create(deployment){


        if(window.fss?.deployments){

            return await window.fss.deployments.create(
                deployment
            );

        }


        return deployment;

    },





    async getById(id){


        if(window.fss?.deployments){

            return await window.fss.deployments.getById(
                id
            );

        }


        return null;

    },





    async delete(id){


        if(window.fss?.deployments){

            return await window.fss.deployments.delete(
                id
            );

        }


        return false;

    }



};


export default deploymentService;