import AutomationTask from "../AutomationTask.js";

import SoftwareRegistry from "../../software/SoftwareRegistry.js";
import SoftwareDownloader from "../../software/SoftwareDownloader.js";
import SoftwareInstaller from "../../software/SoftwareInstaller.js";
import SoftwareVerifier from "../../software/SoftwareVerifier.js";

import SimulationRunner from "../../execution/SimulationRunner.js";

import {
  isSimulationMode,
} from "../../config/ExecutionMode.js";


class InstallSoftware {


  create(data) {


    return new AutomationTask({

      id:
        "install-software",

      name:
        "Install Software",

      type:
        "INSTALL_SOFTWARE",

      data,


      execute:
        async () => {


          /*
           * Resolve the software selected by
           * the execution planner.
           *
           * The planner normally sends:
           *
           * {
           *   software: "chrome"
           * }
           */

          const softwareId =
            data?.software;


          if (!softwareId) {

            return {

              success: false,

              errors:
                "Software selection is missing",

            };

          }


          /*
           * Find the complete software definition
           * from the registry.
           */

          const software =
            SoftwareRegistry.getById(
              softwareId
            );


          if (!software) {

            return {

              success: false,

              errors:
                `Software '${softwareId}' is not registered`,

            };

          }


          /*
           * SIMULATION MODE
           *
           * Do not download anything.
           * Do not install anything.
           * Do not modify Windows.
           */

          if (isSimulationMode()) {

            return SimulationRunner.run({

              name:
                `Install ${software.name}`,

            });

          }


          /*
           * REAL MODE
           *
           * Download the installer.
           */

          const downloadResult =
            await SoftwareDownloader.download(
              software
            );


          if (!downloadResult.success) {

            return {

              success: false,

              errors:
                downloadResult.errors,

            };

          }


          /*
           * Install the downloaded
           * application.
           */

          const installResult =
            await SoftwareInstaller.install(

              software,

              downloadResult.path

            );


          if (!installResult.success) {

            return {

              success: false,

              errors:
                installResult.errors,

              output:
                installResult.output,

            };

          }


          /*
           * Verify that the application
           * was actually installed.
           */

          const verificationResult =
            await SoftwareVerifier.verify(
              software
            );


          if (!verificationResult.success) {

            return {

              success: false,

              errors:
                verificationResult.errors,

              output:
                installResult.output,

            };

          }


          /*
           * Everything succeeded.
           */

          return {

            success: true,

            realMode: true,

            software:
              software.name,

            installer:
              downloadResult.path,

            output:
              `${software.name} installed and verified successfully.`,

          };

        },

    });

  }

}


export default new InstallSoftware();
