import { useContext } from "react";

import { SetupContext } from "../../context/SetupContext";

import printers from "../../data/printers";


function PrinterConfiguration(){


    const {
        setupData,
        setSetupData
    } = useContext(SetupContext);




    function togglePrinter(printerId){


        setSetupData((previousData)=>{


            const exists =
                previousData.printers?.includes(printerId);



            return {


                ...previousData,


                printers:


                    exists

                    ?

                    previousData.printers.filter(
                        id => id !== printerId
                    )

                    :

                    [
                        ...(previousData.printers || []),
                        printerId
                    ]

            };


        });


    }





    return (

        <section>


            <h2>
                Printer Configuration
            </h2>


            {
                printers.map((printer)=>(


                    <div key={printer.id}>


                        <label>


                            <input

                                type="checkbox"

                                checked={
                                    setupData.printers?.includes(
                                        printer.id
                                    )
                                    ||
                                    false
                                }


                                onChange={()=>
                                    togglePrinter(
                                        printer.id
                                    )
                                }


                            />


                            {printer.name}

                            {" - "}

                            {printer.model}


                        </label>


                    </div>


                ))

            }


        </section>

    );

}


export default PrinterConfiguration;