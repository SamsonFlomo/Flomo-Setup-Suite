import { ipcMain } from "electron";

import executionController from "../services/ExecutionController.js";


function registerExecutionIPC() {


  ipcMain.handle(
    "execution:start",

    async (event, data) => {


      const {
        tasks
      } = data;



      if (!tasks || tasks.length === 0) {


        return {

          success:false,

          errors:"No tasks received"

        };


      }



      return executionController.execute(

        tasks,

        event.sender

      );


    }

  );






  ipcMain.handle(
    "execution:pause",

    () => {


      executionController.pause();


      return {

        success:true

      };


    }

  );







  ipcMain.handle(
    "execution:resume",

    () => {


      executionController.resume();


      return {

        success:true

      };


    }

  );







  ipcMain.handle(
    "execution:cancel",

    () => {


      executionController.cancel();


      return {

        success:true

      };


    }

  );







  ipcMain.handle(
    "execution:retry",

    async () => {


      return executionController.retry();


    }

  );







  ipcMain.handle(
    "execution:skip",

    async () => {


      return executionController.skip();


    }

  );


}



export default registerExecutionIPC;