function generateComputerName(
    companyCode,
    department,
    computerType,
    number
) {

    return `${companyCode}-${department}-${computerType}${number}`;

}


export default generateComputerName;