import { useContext, useState } from "react";

import { TemplateContext } from "../../context/TemplateContext";
import TemplateEditForm from "../../components/templates/TemplateEditForm";
import TemplateCard from "../../components/templates/TemplateCard";
import templateCategories from "../../data/templateCategories";

function Templates() {
  const { templates, updateTemplate } = useContext(TemplateContext);

  const [editingTemplate, setEditingTemplate] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const [sortBy, setSortBy] = useState("A-Z");

  const filteredTemplates = templates

    .filter((template) => {
      const matchesSearch = template.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || template.category === selectedCategory;

      const matchesFavorite = !favoritesOnly || template.favorite;

      return matchesSearch && matchesCategory && matchesFavorite;
    })

    .sort((a, b) => {
      if (sortBy === "A-Z") {
        return a.name.localeCompare(b.name);
      }

      if (sortBy === "Z-A") {
        return b.name.localeCompare(a.name);
      }

      return b.id - a.id;
    });
    

  return (
    <section>
      <h1>Configuration Templates</h1>

      <p>Manage reusable computer configurations.</p>

      {editingTemplate && (
        <TemplateEditForm
          template={editingTemplate}
          onSave={(updated) => {
            updateTemplate(updated);

            setEditingTemplate(null);
          }}
          onCancel={() => setEditingTemplate(null)}
        />
      )}

      <section>
        <input
          placeholder="Search templates..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          <option value="All">All Categories</option>

          {templateCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label>
          <input
            type="checkbox"
            checked={favoritesOnly}
            onChange={(event) => setFavoritesOnly(event.target.checked)}
          />
          Favorites Only
        </label>

        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option>A-Z</option>

          <option>Z-A</option>

          <option>Recently Added</option>
        </select>
      </section>

      {templates.length === 0 ? (
        <p>No templates created yet.</p>
      ) : (
        filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onEdit={setEditingTemplate}
          />
        ))
      )}
    </section>
  );
}

export default Templates;
