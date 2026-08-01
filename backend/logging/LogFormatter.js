export function formatLog(log){


    return `

[${log.timestamp}]

${log.type.toUpperCase()}

${log.message}


`;

}