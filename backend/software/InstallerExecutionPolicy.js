import {
isSimulationMode,
getExecutionMode
} from "../config/ExecutionMode.js";

class InstallerExecutionPolicy {


canExecute() {

    return !isSimulationMode();

}


getMode() {

    return getExecutionMode();

}


simulate(software, filePath) {

    return {

        success: true,

        simulated: true,

        software:
            software?.name,

        installer:
            filePath,

        message:
            `Simulation: ${software?.name} would be installed from ${filePath}`

    };

}


}

export default new InstallerExecutionPolicy();
