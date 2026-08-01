import {
createBackup
}
from "./BackupManager";


export function migrateToDatabase(repository){


try{


createBackup();



const organizations =

JSON.parse(

localStorage.getItem(

"flomo_organizations"

)

|| "[]"

);



organizations.forEach(org=>{


repository.createOrganization(org);


});



localStorage.setItem(

"migration_status",

"completed"

);



return true;



}

catch(error){


console.error(

"Migration failed",

error

);



localStorage.setItem(

"migration_status",

"failed"

);



return false;


}


}