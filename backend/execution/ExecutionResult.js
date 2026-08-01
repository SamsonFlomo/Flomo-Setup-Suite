export default class ExecutionResult {

    constructor({

        success,

        output = "",

        error = ""

    }) {

        this.success = success;

        this.output = output;

        this.error = error;

    }

}