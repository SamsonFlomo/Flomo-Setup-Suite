import fs from "fs";


class DownloadVerifier {


    async verify(filePath) {


        if (!filePath) {

            return {

                valid: false,

                errors:
                    "Downloaded file path is missing"

            };

        }


        try {


            const stats =
                await fs.promises.stat(
                    filePath
                );


            if (!stats.isFile()) {

                return {

                    valid: false,

                    errors:
                        "Downloaded resource is not a file"

                };

            }


            if (stats.size === 0) {

                return {

                    valid: false,

                    errors:
                        "Downloaded file is empty"

                };

            }


            return {

                valid: true,

                size: stats.size

            };


        } catch (error) {


            return {

                valid: false,

                errors:
                    `Unable to verify downloaded file: ${error.message}`

            };

        }

    }

}


export default new DownloadVerifier();