import { useState, useContext } from "react";

import { OrganizationContext } from "../../context/OrganizationContext";

function OrganizationForm() {
  const { addOrganization } = useContext(OrganizationContext);

  const [formData, setFormData] = useState({
    name: "",

    code: "",

    domain: "",

    description: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,

      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newOrganization = {
      id: Date.now(),

      ...formData,

      departments: [],
    };

    addOrganization(newOrganization);

    setFormData({
      name: "",

      code: "",

      domain: "",

      description: "",
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Organization</h3>

      <input
        name="name"
        placeholder="Organization Name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        name="code"
        placeholder="Company Code"
        value={formData.code}
        onChange={handleChange}
      />

      <input
        name="domain"
        placeholder="Domain (optional)"
        value={formData.domain}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <button type="submit">Save Organization</button>
    </form>
  );
}

export default OrganizationForm;
