class DependencyValidator {

    async validateSoftware(software) {

        if (!software) {

            return {
                valid: false,
                errors: "Software information is missing"
            };

        }

        if (!software.source) {

            return {
                valid: false,
                errors:
                    `No installation source configured for ${software.name}`
            };

        }

        if (
            software.source.type === "online" &&
            !software.source.url
        ) {

            return {
                valid: false,
                errors:
                    `No download URL configured for ${software.name}`
            };

        }

        return {
            valid: true
        };

    }


    async validatePrinter(printer) {

        if (!printer) {

            return {
                valid: false,
                errors: "Printer information is missing"
            };

        }

        if (!printer.driver) {

            return {
                valid: false,
                errors:
                    `No driver configuration found for ${printer.name}`
            };

        }

        return {
            valid: true
        };

    }

}


export default new DependencyValidator();