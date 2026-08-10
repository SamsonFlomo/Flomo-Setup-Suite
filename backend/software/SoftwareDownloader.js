import path from "path";
import os from "os";

import DownloadVerifier from "../resources/DownloadVerifier.js";

import OnlineDownloader from "../resources/OnlineDownloader.js";

class SoftwareDownloader {
  async download(software) {
    if (!software) {
      return {
        success: false,

        errors: "Software information is missing",
      };
    }

    if (!software.source) {
      return {
        success: false,

        errors: `No source configured for ${software.name}`,
      };
    }

    if (software.source.type !== "online") {
      return {
        success: false,

        errors: `Unsupported software source type: ${software.source.type}`,
      };
    }

    const downloadsDirectory = path.join(
      os.tmpdir(),
      "FlomoSetupSuite",
      "downloads",
    );

    const extension = software.installer?.type === "msi" ? ".msi" : ".exe";

    const filename = `${software.id}${extension}`;

    const destination = path.join(downloadsDirectory, filename);

    console.log(`Downloading ${software.name}`);

    console.log(`Source: ${software.source.url}`);

    const result = await OnlineDownloader.download(
      software.source.url,
      destination,
    );

    if (!result.success) {
      return {
        success: false,

        errors: `Failed to download ${software.name}: ${result.errors}`,
      };
    }

    const verification = await DownloadVerifier.verify(result.path);

    if (!verification.valid) {
      return {
        success: false,

        errors: verification.errors,
      };
    }

    if (!result.success) {
      return {
        success: false,

        errors: `Failed to download ${software.name}: ${result.errors}`,
      };
    }

    return {
      success: true,

      path: result.path,

      output: `${software.name} downloaded successfully`,
    };
  }
}

export default new SoftwareDownloader();
