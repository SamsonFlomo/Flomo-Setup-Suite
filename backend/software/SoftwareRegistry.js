import Software from "../models/Software.js";

class SoftwareRegistry {
  constructor() {
    this.software = [
      new Software({
        id: "google-chrome",

        name: "Google Chrome",

        category: "browser",

        source: {
          type: "online",

          url: "https://dl.google.com/chrome/install/latest/chrome_installer.exe",
        },

        installer: {
          type: "exe",

          silent: "/silent",
        },

        verify: {
          path: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        },
      }),

      new Software({
        id: "firefox",

        name: "Mozilla Firefox",

        category: "browser",

        source: {
          type: "online",

          url: "https://download.mozilla.org/?product=firefox-latest&os=win64&lang=en-US",
        },

        installer: {
          type: "exe",

          silent: "-ms",
        },

        verify: {
          path: "C:\\Program Files\\Mozilla Firefox\\firefox.exe",
        },
      }),

      new Software({
        id: "7zip",

        name: "7-Zip",

        category: "utility",

        source: {
          type: "online",

          url: "https://www.7-zip.org",
        },

        installer: {
          type: "exe",

          silent: "/S",
        },

        verify: {
          path: "C:\\Program Files\\7-Zip\\7z.exe",
        },
      }),

      new Software({
        id: "microsoft-office-365",

        name: "Microsoft Office 365",

        category: "office",

        source: {
          type: "online",

          url: "https://officecdn.microsoft.com",
        },

        installer: {
          type: "deployment-tool",

          silent: "/configure",
        },

        verify: {
          path: "C:\\Program Files\\Microsoft Office",
        },
      }),
    ];
  }

  getAll() {
    return this.software;
  }

  getById(id) {
    const aliases = {
      chrome: "google-chrome",

      office: "microsoft-office-365",

      "microsoft-office": "microsoft-office-365",

      "ms-office": "microsoft-office-365",

      "7zip": "7zip",
    };

    const lookupId = aliases[id] || id;

    return this.software.find((app) => app.id === lookupId);
  }
}

export default new SoftwareRegistry();
