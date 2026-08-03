import { ipcMain } from "electron";

import deploymentRepository from "../../backend/repository/DeploymentRepository.js";

import deploymentService from "../services/deploymentService.js";

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

export default registerDeploymentIPC;
