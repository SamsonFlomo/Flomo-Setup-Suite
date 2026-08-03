import { spawn } from "child_process";



class PowerShellService {


    execute(script) {


        return new Promise((resolve) => {


            const process = spawn(

                "powershell.exe",

                [

                    "-NoProfile",

                    "-ExecutionPolicy",

                    "Bypass",

                    "-Command",

                    "-"

                ]

            );



            let stdout = "";

            let stderr = "";



            process.stdout.on(

                "data",

                (data) => {

                    stdout += data.toString();

                }

            );




            process.stderr.on(

                "data",

                (data) => {

                    stderr += data.toString();

                }

            );





            process.on(

                "close",

                (code) => {


                    resolve({

                        success: code === 0,

                        exitCode: code,

                        output: stdout,

                        errors: stderr

                    });


                }

            );





            process.stdin.write(script);

            process.stdin.end();


        });


    }


}



export default new PowerShellService();