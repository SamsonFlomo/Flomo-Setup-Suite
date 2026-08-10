import Printer from "../models/Printer.js";

class PrinterRegistry {

    constructor(){

        this.printers = [

            new Printer({

                id: "hp-laser",

                name: "HP LaserJet",

                manufacturer: "HP",

                connection: "network",

                driver: {

                    type: "online",

                    url: "https://support.hp.com"

                },

                verify: {

                    name: "HP LaserJet"

                }

            }),

            new Printer({

                id: "canon-office",

                name: "Canon Office Printer",

                manufacturer: "Canon",

                connection: "network",

                driver: {

                    type: "online",

                    url: "https://www.canon.com"

                },

                verify: {

                    name: "Canon Office Printer"

                }

            }),

            new Printer({

                id: "network-printer",

                name: "Generic Network Printer",

                manufacturer: "Generic",

                connection: "network",

                driver: {

                    type: "windows"

                },

                verify: {

                    name: "Generic Network Printer"

                }

            })

        ];

    }

    getAll(){

        return this.printers;

    }

    getById(id){

        return this.printers.find(

            printer => printer.id === id

        );

    }

}

export default new PrinterRegistry();