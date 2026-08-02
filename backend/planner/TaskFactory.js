function createTask(
    id,
    type,
    data
){

    return {

        id,
        type,
        status:"pending",
        data

    };

}


module.exports = {
    createTask
};