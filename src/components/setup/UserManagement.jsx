import { useContext, useState } from "react";

import { SetupContext } from "../../context/SetupContext";

function UserManagement() {

    const { setupData, setSetupData } = useContext(SetupContext);

    const [username, setUsername] = useState("");

    const [fullName, setFullName] = useState("");

    const [accountType, setAccountType] = useState("Standard");



    function addUser() {

        if (!username.trim()) {
            return;
        }

        const newUser = {

            id: Date.now(),

            username,

            fullName,

            type: accountType

        };


        setSetupData((previousData) => ({

            ...previousData,

            accounts: {

                ...previousData.accounts,

                users: [

                    ...previousData.accounts.users,

                    newUser

                ]

            }

        }));


        setUsername("");

        setFullName("");

        setAccountType("Standard");

    }



    function deleteUser(id) {

        setSetupData((previousData) => ({

            ...previousData,

            accounts: {

                ...previousData.accounts,

                users: previousData.accounts.users.filter(

                    (user) => user.id !== id

                )

            }

        }));

    }



    return (

        <section>

            <h2>User Management</h2>

            <input

                placeholder="Username"

                value={username}

                onChange={(event) => setUsername(event.target.value)}

            />

            <input

                placeholder="Full Name"

                value={fullName}

                onChange={(event) => setFullName(event.target.value)}

            />

            <select

                value={accountType}

                onChange={(event) => setAccountType(event.target.value)}

            >

                <option>Standard</option>

                <option>Administrator</option>

            </select>

            <button onClick={addUser}>

                Add User

            </button>

            <hr />

            {

                setupData.accounts.users.length === 0

                ?

                <p>No users added.</p>

                :

                setupData.accounts.users.map((user) => (

                    <div key={user.id}>

                        <strong>{user.username}</strong>

                        {" - "}

                        {user.type}

                        {" "}

                        <button

                            onClick={() => deleteUser(user.id)}

                        >

                            Delete

                        </button>

                    </div>

                ))

            }

        </section>

    );

}

export default UserManagement;