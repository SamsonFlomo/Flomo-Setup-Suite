import fs from "fs";
import path from "path";
import https from "https";
import http from "http";


class OnlineDownloader {


    async download(url, destination) {


        if (!url) {

            return {

                success: false,

                errors:
                    "Download URL is missing"

            };

        }


        if (!destination) {

            return {

                success: false,

                errors:
                    "Download destination is missing"

            };

        }


        const directory =
            path.dirname(destination);


        await fs.promises.mkdir(
            directory,
            {
                recursive: true
            }
        );


        return new Promise((resolve) => {


            const client =
                url.startsWith("https://")
                    ? https
                    : http;


            const request =
                client.get(
                    url,
                    (response) => {


                        if (
                            response.statusCode >= 300 &&
                            response.statusCode < 400 &&
                            response.headers.location
                        ) {

                            response.resume();

                            this.download(
                                response.headers.location,
                                destination
                            ).then(resolve);

                            return;

                        }


                        if (
                            response.statusCode !== 200
                        ) {

                            response.resume();

                            resolve({

                                success: false,

                                errors:
                                    `Download failed with HTTP status ${response.statusCode}`

                            });

                            return;

                        }


                        const file =
                            fs.createWriteStream(
                                destination
                            );


                        response.pipe(file);


                        file.on(
                            "finish",
                            () => {

                                file.close(
                                    () => {

                                        resolve({

                                            success: true,

                                            path:
                                                destination

                                        });

                                    }
                                );

                            }
                        );


                        file.on(
                            "error",
                            (error) => {

                                file.close();

                                resolve({

                                    success: false,

                                    errors:
                                        error.message

                                });

                            }
                        );


                    }
                );


            request.on(
                "error",
                (error) => {

                    resolve({

                        success: false,

                        errors:
                            error.message

                    });

                }
            );


        });

    }

}


export default new OnlineDownloader();