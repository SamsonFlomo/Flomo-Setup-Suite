function escapePowerShell(value) {

    return String(value ?? "")
        .replace(/'/g, "''");

}


function subnetMaskToPrefixLength(subnetMask) {

    if (!subnetMask) {

        return null;

    }


    const parts =
        String(subnetMask)
            .split(".")
            .map(Number);


    if (

        parts.length !== 4 ||

        parts.some(

            (part) =>

                !Number.isInteger(part) ||

                part < 0 ||

                part > 255

        )

    ) {

        return null;

    }


    const binary =
        parts

            .map(

                (part) =>

                    part
                        .toString(2)
                        .padStart(8, "0")

            )

            .join("");


    if (!/^1*0*$/.test(binary)) {

        return null;

    }


    return binary

        .split("")

        .filter(

            (bit) => bit === "1"

        )

        .length;

}


function configureNetwork(data) {

    const ipAddress =
        escapePowerShell(
            data?.ipAddress
        );


    const subnetMask =
        escapePowerShell(
            data?.subnetMask
        );


    const gateway =
        escapePowerShell(
            data?.gateway
        );


    const dns =
        escapePowerShell(
            data?.dns
        );


    const workgroup =
        escapePowerShell(
            data?.workgroup
        );


    if (!ipAddress) {

        return `
throw "IP address is required"
`;

    }


    if (!subnetMask) {

        return `
throw "Subnet mask is required"
`;

    }


    const prefixLength =
        subnetMaskToPrefixLength(
            subnetMask
        );


    if (prefixLength === null) {

        return `
throw "Invalid subnet mask: ${subnetMask}"
`;

    }


    return `
$ipAddress = '${ipAddress}'
$subnetMask = '${subnetMask}'
$prefixLength = ${prefixLength}
$gateway = '${gateway}'
$dns = '${dns}'
$workgroup = '${workgroup}'


$adapter = Get-NetAdapter | Where-Object {
    $_.Status -eq "Up" -and $_.HardwareInterface
} | Select-Object -First 1


if (-not $adapter) {

    throw "No active network adapter was found"

}


$existingAddresses = Get-NetIPAddress -InterfaceIndex $adapter.ifIndex -AddressFamily IPv4 -ErrorAction SilentlyContinue


if ($existingAddresses) {

    foreach ($address in $existingAddresses) {

        if ($address.IPAddress -ne "127.0.0.1") {

            Remove-NetIPAddress -InputObject $address -Confirm:$false -ErrorAction SilentlyContinue

        }

    }

}


if ($gateway) {

    New-NetIPAddress -InterfaceIndex $adapter.ifIndex -IPAddress $ipAddress -PrefixLength $prefixLength -DefaultGateway $gateway

}
else {

    New-NetIPAddress -InterfaceIndex $adapter.ifIndex -IPAddress $ipAddress -PrefixLength $prefixLength

}


if ($dns) {

    Set-DnsClientServerAddress -InterfaceIndex $adapter.ifIndex -ServerAddresses $dns

}


if ($workgroup) {

    Write-Output "Workgroup configuration requested: $workgroup"

}


Write-Output "Network configuration completed successfully."
`;

}


export {

    configureNetwork,

    subnetMaskToPrefixLength

};