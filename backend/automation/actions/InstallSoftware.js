import SoftwareRegistry from "../../software/SoftwareRegistry.js";
import SoftwareDownloader from "../../software/SoftwareDownloader.js";
import SoftwareInstaller from "../../software/SoftwareInstaller.js";
import SoftwareVerifier from "../../software/SoftwareVerifier.js";
import DependencyValidator from "../../validation/DependencyValidator.js";

class InstallSoftware {
  constructor(data) {
    this.data = data;
  }

  async execute() {
    console.log("Software task received:", this.data);

    const software = SoftwareRegistry.getById(this.data.software);

    if (!software) {
      return {
        success: false,

        errors: `Software '${this.data.software}' not found`,
      };
    }

    const validation = await DependencyValidator.validateSoftware(software);

    if (!validation.valid) {
      return {
        success: false,

        errors: validation.errors,
      };
    }

    const downloadResult = await SoftwareDownloader.download(software);

    if (!downloadResult.success) {
      return downloadResult;
    }

    const installResult = await SoftwareInstaller.install(
      software,
      downloadResult.path,
    );

    if (!installResult.success) {
      return installResult;
    }

    if (installResult.simulated) {
      return {
        success: true,

        simulated: true,

        software: software.name,

        installation: installResult,
      };
    }

    const verification = await SoftwareVerifier.verify(software);

    if (!verification.success) {
      return {
        success: false,

        errors: verification.errors,

        installation: installResult,
      };
    }

    return {
      success: true,

      software: software.name,

      installation: installResult,

      verification,
    };
  }
}

export default InstallSoftware;
