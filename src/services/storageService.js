const STORAGE_KEYS = {
  ORGANIZATIONS: "flomo_organizations",

  SETUP_DATA: "flomo_setup_data",

  DEPLOYMENTS: "flomo_deployments",
};

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function loadData(key, defaultValue) {
  const storedData = localStorage.getItem(key);

  if (!storedData) {
    return defaultValue;
  }

  return JSON.parse(storedData);
}

function removeData(key) {
  localStorage.removeItem(key);
}

const storageService = {
  saveOrganizations(organizations) {
    saveData(STORAGE_KEYS.ORGANIZATIONS, organizations);
  },

  loadOrganizations() {
    return loadData(STORAGE_KEYS.ORGANIZATIONS, []);
  },

  saveSetupData(setupData) {
    saveData(STORAGE_KEYS.SETUP_DATA, setupData);
  },

  loadSetupData(defaultValue) {
    return loadData(STORAGE_KEYS.SETUP_DATA, defaultValue);
  },

  clearAll() {
    removeData(STORAGE_KEYS.ORGANIZATIONS);

    removeData(STORAGE_KEYS.SETUP_DATA);
  },

  saveDeployments(deployments) {
    saveData(
      STORAGE_KEYS.DEPLOYMENTS,

      deployments,
    );
  },

  loadDeployments() {
    return loadData(
      STORAGE_KEYS.DEPLOYMENTS,

      [],
    );
  },
};

export default storageService;
