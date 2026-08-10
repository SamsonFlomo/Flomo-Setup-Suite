import fs from "fs";

class SoftwareVerifier {


async verify(software) {


    if (!software) {

        return {

            success: false,

            installed: false,

            errors:
                "Software information is missing"

        };

    }


    const verifyPath =
        software.verify?.path;


    if (!verifyPath) {

        return {

            success: false,

            installed: false,

            errors:
                `No verification path configured for ${software.name}`

        };

    }


    try {


        const exists =
            await fs.promises
                .access(
                    verifyPath,
                    fs.constants.F_OK
                )
                .then(
                    () => true
                )
                .catch(
                    () => false
                );


        if (!exists) {

            return {

                success: false,

                installed: false,

                errors:
                    `${software.name} was not found at ${verifyPath}`

            };

        }


        return {

            success: true,

            installed: true,

            path:
                verifyPath

        };


    } catch (error) {


        return {

            success: false,

            installed: false,

            errors:
                `Unable to verify ${software.name}: ${error.message}`

        };

    }

}

}

export default new SoftwareVerifier();
