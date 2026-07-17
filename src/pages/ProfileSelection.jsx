import profiles from "../data/profiles";
import ProfileCard from "../components/setup/ProfileCard";

function ProfileSelection() {
    return (
        <div>
            <h1>Flomo Setup Suite</h1>

            <p>Select the type of computer you want to configure.</p>

            {profiles.map((profile) => (
                <ProfileCard
                    key={profile.id}
                    title={profile.title}
                    description={profile.description}
                />
            ))}
        </div>
    );
}

export default ProfileSelection;