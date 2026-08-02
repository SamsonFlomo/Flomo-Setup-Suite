const { ipcMain } = require("electron");

const deploymentRepository = require("../../backend/repository/DeploymentRepository");

const deploymentService = require("../services/deploymentService");

function registerDeploymentIPC() {
  ipcMain.handle("deployment:getAll", () => {
    return deploymentRepository.getAll();
  });

  ipcMain.handle(
    "deployment:execute",

    async (event, setupData) => {
      return await deploymentService.deploy(setupData);
    },
  );

  ipcMain.handle("deployment:create", (event, deployment) => {
    return deploymentRepository.create(deployment);
  });

  ipcMain.handle("deployment:getById", (event, id) => {
    return deploymentRepository.getById(id);
  });

  ipcMain.handle("deployment:delete", (event, id) => {
    return deploymentRepository.delete(id);
  });
}

module.exports = registerDeploymentIPC;
