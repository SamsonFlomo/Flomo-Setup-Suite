import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { SetupContext } from "../../context/SetupContext";
import profiles from "../../data/profiles";
import ProfileCard from "../../components/setup/ProfileCard";
import TemplateLoader from "../../components/setup/TemplateLoader";
import ROUTES from "../../constants/routes";

function ProfileSelection() {
  const { setupData, applyProfile } = useContext(SetupContext);

  const navigate = useNavigate();

  function continueSetup() {
    if (!setupData.profile) {
      return;
    }

    navigate(ROUTES.SETUP);
  }

  return (
    <div>
      <h1>Flomo Setup Suite</h1>

      <TemplateLoader />

      <p>Select the type of computer you want to configure.</p>

      {profiles.map((profile) => (
        <ProfileCard
          key={profile.id}
          id={profile.id}
          title={profile.title}
          description={profile.description}
          selected={setupData.profile?.id === profile.id}
          onSelect={() => applyProfile(profile)}
        />
      ))}

      <button disabled={!setupData.profile} onClick={continueSetup}>
        Continue
      </button>
    </div>
  );
}

export default ProfileSelection;
