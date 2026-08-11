class Printer {
    constructor({
        id,
        name,
        model,
        type = "network",
        ipAddress = null,
        address = null,
        host = null,
        driver = null,
        departments = []
    }) {

        this.id = id;

        this.name = name;

        this.model = model;

        this.type = type;

        this.ipAddress = ipAddress;

        this.address = address;

        this.host = host;

        this.driver = driver;

        this.departments = departments;

    }
}

export default Printer;