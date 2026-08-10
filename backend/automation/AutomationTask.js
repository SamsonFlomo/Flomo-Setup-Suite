class AutomationTask {

    constructor({
        id,
        name,
        type,
        data,
        execute
    }) {

        this.id = id;

        this.name = name;

        this.type = type;

        this.data = data;

        this.execute = execute;

    }

}


export default AutomationTask;