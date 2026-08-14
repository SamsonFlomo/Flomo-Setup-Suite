function escapePowerShell(value) {
    return String(value ?? "")
        .replace(/'/g, "''");
}


function createUser(data) {

    const username =
        escapePowerShell(
            data?.username
        );

    const password =
        escapePowerShell(
            data?.password
        );


    if (!username) {

        return `
throw "Username is required"
`;

    }


    if (!password) {

        return `
throw "Password is required"
`;

    }


    return `
$username = '${username}'
$password = '${password}'

$securePassword = ConvertTo-SecureString $password -AsPlainText -Force

$existingUser = Get-LocalUser -Name $username -ErrorAction SilentlyContinue

if ($existingUser) {

    Write-Output "User already exists: $username"

}
else {

    New-LocalUser -Name $username -Password $securePassword -PasswordNeverExpires:$false

    Write-Output "User created: $username"

}
`;

}


function createAdministrator(data) {

    const username =
        escapePowerShell(
            data?.username
        );


    if (!username) {

        return `
throw "Username is required"
`;

    }


    return `
$username = '${username}'

$existingUser = Get-LocalUser -Name $username -ErrorAction SilentlyContinue

if (-not $existingUser) {

    throw "User does not exist: $username"

}

$member = Get-LocalGroupMember -Group "Administrators" -ErrorAction SilentlyContinue |
    Where-Object {
        $_.Name -match "\\\\$username$"
    }

if ($member) {

    Write-Output "User is already an administrator: $username"

}
else {

    Add-LocalGroupMember -Group "Administrators" -Member $username

    Write-Output "Administrator privileges granted: $username"

}
`;

}


function verifyUser(data) {

    const username =
        escapePowerShell(
            data?.username
        );


    if (!username) {

        return `
throw "Username is required"
`;

    }


    return `
$username = '${username}'

$user = Get-LocalUser -Name $username -ErrorAction SilentlyContinue

if ($user) {

    Write-Output "User verified: $username"

}
else {

    Write-Error "User verification failed: $username"

    exit 1

}
`;

}


export {
    createUser,
    createAdministrator,
    verifyUser
};