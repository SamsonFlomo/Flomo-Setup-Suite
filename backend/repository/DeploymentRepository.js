class DeploymentRepository {


    constructor() {

        this.deployments = [];

    }



    getAll() {

        return this.deployments;

    }



    getById(id) {

        return this.deployments.find(
            deployment =>
                deployment.id === id
        );

    }



    create(deployment) {

        this.deployments.push(
            deployment
        );


        return deployment;

    }



    delete(id) {


        this.deployments =
            this.deployments.filter(
                deployment =>
                    deployment.id !== id
            );


        return true;

    }



    clear() {

        this.deployments = [];

    }


}


module.exports = new DeploymentRepository();