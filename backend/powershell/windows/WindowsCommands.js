function escapePowerShell(value) {

    return String(value ?? "")
        .replace(/'/g, "''");

}


function renameComputer(data) {

    const newName =
        escapePowerShell(
            data?.newName ||
            data?.name
        );


    if (!newName) {

        return `
throw "Computer name is required"
`;

    }


    return `
$newName = '${newName}'

$currentName = $env:COMPUTERNAME

if ($currentName -eq $newName) {

    Write-Output "Computer already has the requested name: $newName"

}
else {

    Rename-Computer -NewName $newName -Force

    Write-Output "Computer rename requested: $currentName -> $newName"

}
`;

}


function verifyComputerName(data) {

    const expectedName =
        escapePowerShell(
            data?.name ||
            data?.newName
        );


    if (!expectedName) {

        return `
throw "Computer name is required"
`;

    }


    return `
$expectedName = '${expectedName}'

$currentName = $env:COMPUTERNAME

if ($currentName -eq $expectedName) {

    Write-Output "Computer name verified: $currentName"

    exit 0

}
else {

    Write-Error "Computer name verification failed. Expected: $expectedName. Current: $currentName"

    exit 1

}
`;

}


export {
    renameComputer,
    verifyComputerName
};