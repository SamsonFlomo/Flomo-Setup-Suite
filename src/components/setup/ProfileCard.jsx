import "../../assets/styles/components/profile-card.css";


function ProfileCard({
    id,
    title,
    description,
    selected,
    onSelect
}) {

    return (

        <button
            onClick={() => onSelect(id)}
        >

            <h2>{title}</h2>

            <p>{description}</p>

        </button>

    );
}

export default ProfileCard;