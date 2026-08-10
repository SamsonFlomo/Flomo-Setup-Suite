class PrinterDriverDownloader {

    async download(printer){

        console.log(

            `Downloading driver for ${printer.name}`

        );

        await new Promise(

            resolve =>

                setTimeout(resolve,1000)

        );

        return {

            success:true

        };

    }

}

export default new PrinterDriverDownloader();