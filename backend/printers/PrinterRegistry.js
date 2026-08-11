import Printer from "../models/Printer.js";


class PrinterRegistry {


    constructor() {

        this.printers = [

            new Printer({

                id:
                    "canon-office",

                name:
                    "Canon Office Printer",

                model:
                    "Canon IR2520",

                type:
                    "local",

                departments: [
                    "administration",
                    "finance"
                ]

            }),


            new Printer({

                id:
                    "hp-laser",

                name:
                    "HP Laser Printer",

                model:
                    "HP LaserJet",

                type:
                    "local",

                departments: [
                    "general"
                ]

            }),


            new Printer({

                id:
                    "network-printer",

                name:
                    "Network Printer",

                model:
                    "Generic Network Printer",

                type:
                    "network",

                departments: [
                    "all"
                ]

            })

        ];

    }


    getAll() {

        return this.printers;

    }


    getById(id) {

        return this.printers.find(

            printer =>
                printer.id === id

        );

    }

}


export default new PrinterRegistry();