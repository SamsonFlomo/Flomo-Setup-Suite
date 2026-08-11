function escapePowerShell(value) {
  return String(value ?? "").replace(/'/g, "''");
}

function installNetworkPrinter(printer) {
  const name = escapePowerShell(
    printer?.name || printer?.id || "Network Printer",
  );

  const address = escapePowerShell(
    printer?.ipAddress || printer?.address || printer?.host,
  );

  if (!address) {
    return `
throw "Printer address is missing"
`;
  }

  return `
$printerName = '${name}'
$printerAddress = '${address}'
$portName = "IP_$printerAddress"

$existingPort = Get-PrinterPort -Name $portName -ErrorAction SilentlyContinue

if (-not $existingPort) {
    Add-PrinterPort -Name $portName -PrinterHostAddress $printerAddress
}

$existingPrinter = Get-Printer -Name $printerName -ErrorAction SilentlyContinue

if ($existingPrinter) {
    Write-Output "Printer already exists: $printerName"
}
else {
    Add-Printer -Name $printerName -PortName $portName
    Write-Output "Printer installed: $printerName"
}
`;
}

function removePrinter(printer) {
  const name = escapePowerShell(printer?.name || printer?.id);

  return `
$printerName = '${name}'

$existingPrinter = Get-Printer -Name $printerName -ErrorAction SilentlyContinue

if ($existingPrinter) {
    Remove-Printer -Name $printerName -Confirm:$false
    Write-Output "Printer removed: $printerName"
}
else {
    Write-Output "Printer not found: $printerName"
}
`;
}

function verifyPrinter(printer) {
  const name = escapePowerShell(printer?.name || printer?.id);

  return `
$printerName = '${name}'

$printer = Get-Printer -Name $printerName -ErrorAction SilentlyContinue

if ($printer) {
    Write-Output "Printer verified: $printerName"
    exit 0
}
else {
    Write-Error "Printer verification failed: $printerName"
    exit 1
}
`;
}

export { installNetworkPrinter, removePrinter, verifyPrinter };
