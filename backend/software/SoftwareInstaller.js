import { spawn } from "child_process";

import InstallerExecutionPolicy from "./InstallerExecutionPolicy.js";

class SoftwareInstaller {
  async install(software, filePath) {
    if (!software) {
      return {
        success: false,

        errors: "Software information is missing",
      };
    }

    if (!filePath) {
      return {
        success: false,

        errors: `Installer file for ${software.name} is missing`,
      };
    }

    const installerType = software.installer?.type;

    if (installerType !== "exe") {
      return {
        success: false,

        errors: `Installer type '${installerType}' is not supported yet`,
      };
    }

    const silentArguments = software.installer?.silent || "";

    const args = silentArguments ? silentArguments.split(" ") : [];

    console.log(`Installing ${software.name}`);

    return new Promise((resolve) => {
      if (!InstallerExecutionPolicy.canExecute()) {
        return InstallerExecutionPolicy.simulate(software, filePath);
      }

      const process = spawn(filePath, args, {
        windowsHide: true,
      });

      let stdout = "";

      let stderr = "";

      process.stdout.on("data", (data) => {
        stdout += data.toString();
      });

      process.stderr.on("data", (data) => {
        stderr += data.toString();
      });

      process.on("error", (error) => {
        resolve({
          success: false,

          errors: error.message,

          output: stdout,
        });
      });

      process.on("close", (code) => {
        resolve({
          success: code === 0,

          exitCode: code,

          output: stdout,

          errors: stderr,
        });
      });
    });
  }
}

export default new SoftwareInstaller();
