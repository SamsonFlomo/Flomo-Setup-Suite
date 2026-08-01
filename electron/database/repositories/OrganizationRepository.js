import database from "../database/database";


export function createOrganization(org){


const statement = database.prepare(`

INSERT INTO organizations

(name,code,domain,description)

VALUES

(?,?,?,?)

`);



return statement.run(

org.name,

org.code,

org.domain,

org.description

);


}



export function getOrganizations(){


return database
.prepare(
"SELECT * FROM organizations"
)
.all();


}