const ExecutionModes = {
    SIMULATION: "simulation",
    REAL: "real"
};


function getExecutionMode() {

    const mode =
        process.env.FSS_EXECUTION_MODE;

    if (
        mode === ExecutionModes.REAL
    ) {

        return ExecutionModes.REAL;

    }

    return ExecutionModes.SIMULATION;

}


function isRealMode() {

    return (
        getExecutionMode() ===
        ExecutionModes.REAL
    );

}


function isSimulationMode() {

    return !isRealMode();

}


export {
    ExecutionModes,
    getExecutionMode,
    isRealMode,
    isSimulationMode
};
