class PrinterVerifier {

    async verify(printer){

        console.log(

            `Verifying printer: ${printer.name}`

        );

        return true;

    }

}

export default new PrinterVerifier();