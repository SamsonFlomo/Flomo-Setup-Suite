import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { SetupContext } from "../context/SetupContext";
import profiles from "../data/profiles";
import ProfileCard from "../components/setup/ProfileCard";


function ProfileSelection() {

    const { setupData, setSetupData } = useContext(SetupContext);

    const navigate = useNavigate();


    function continueSetup(){

        if(!setupData.profile){
            return;
        }

        navigate("/setup");
    }


    return (
        <div>

            <h1>Flomo Setup Suite</h1>

            <p>
                Select the type of computer you want to configure.
            </p>


            {profiles.map((profile) => (

                <ProfileCard

                    key={profile.id}

                    id={profile.id}

                    title={profile.title}

                    description={profile.description}

                    selected={setupData.profile === profile.id}

                    onSelect={(id) =>
                        setSetupData((previousData) => ({
                            ...previousData,
                            profile: id
                        }))
                    }

                />

            ))}


            <button
                disabled={!setupData.profile}
                onClick={continueSetup}
            >
                Continue
            </button>


        </div>
    );
}


export default ProfileSelection;