export const ExecutionMode = {

    SIMULATION: "simulation",

    REAL: "real"

};

class ExecutionEnvironment {

    constructor() {

        this.mode = ExecutionMode.SIMULATION;

    }

    getMode() {

        return this.mode;

    }

    setMode(mode) {

        this.mode = mode;

    }

    isSimulation() {

        return this.mode === ExecutionMode.SIMULATION;

    }

    isReal() {

        return this.mode === ExecutionMode.REAL;

    }

}

export default new ExecutionEnvironment();