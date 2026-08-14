import { useContext } from "react";

import { SetupContext } from "../../context/SetupContext";


function NetworkSettings() {

    const {
        setupData,
        setSetupData
    } = useContext(SetupContext);


    const network =
        setupData.computer;


    function updateNetwork(field, value) {

        setSetupData((previousData) => ({

            ...previousData,

            computer: {

                ...previousData.computer,

                [field]:
                    value

            }

        }));

    }


    return (

        <section>

            <h2>
                Network Settings
            </h2>


            <div>

                <label>
                    IP Address
                </label>

                <input
                    type="text"
                    value={
                        network.ipAddress || ""
                    }
                    placeholder="192.168.1.100"
                    onChange={(event) =>
                        updateNetwork(
                            "ipAddress",
                            event.target.value
                        )
                    }
                />

            </div>


            <div>

                <label>
                    Subnet Mask
                </label>

                <input
                    type="text"
                    value={
                        network.subnetMask || ""
                    }
                    placeholder="255.255.255.0"
                    onChange={(event) =>
                        updateNetwork(
                            "subnetMask",
                            event.target.value
                        )
                    }
                />

            </div>


            <div>

                <label>
                    Default Gateway
                </label>

                <input
                    type="text"
                    value={
                        network.gateway || ""
                    }
                    placeholder="192.168.1.1"
                    onChange={(event) =>
                        updateNetwork(
                            "gateway",
                            event.target.value
                        )
                    }
                />

            </div>


            <div>

                <label>
                    DNS Server
                </label>

                <input
                    type="text"
                    value={
                        network.dns || ""
                    }
                    placeholder="8.8.8.8"
                    onChange={(event) =>
                        updateNetwork(
                            "dns",
                            event.target.value
                        )
                    }
                />

            </div>

        </section>

    );

}


export default NetworkSettings;