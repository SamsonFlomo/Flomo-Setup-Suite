import { useContext } from "react";

import { TemplateContext } from "../../context/TemplateContext";

function TemplateCard({ template, onEdit }) {

  const {
    deleteTemplate,
    toggleFavorite,
  } = useContext(TemplateContext);

  return (
    <div>
      <h3>{template.name}</h3>

      <p>Category: {template.category}</p>

      <p>Profile: {template.profile?.title || "No Profile"}</p>

      <p>Organization: {template.computer.organization?.name}</p>

      <p>Department: {template.computer.department?.name}</p>

      <p>Software: {template.software.length} applications</p>

      <button onClick={() => onEdit(template)}>
        Edit
      </button>

      <button onClick={() => deleteTemplate(template.id)}>
        Delete
      </button>

      <button onClick={() => toggleFavorite(template.id)}>
        {template.favorite ? "★ Favorite" : "☆ Favorite"}
      </button>
    </div>
  );
}

export default TemplateCard;