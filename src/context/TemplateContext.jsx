import { createContext, useEffect, useState } from "react";

export const TemplateContext = createContext();

const STORAGE_KEY = "flomo_templates";

export function TemplateProvider({ children }) {
  const [templates, setTemplates] = useState([]);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      setTemplates(JSON.parse(stored));
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    localStorage.setItem(
      STORAGE_KEY,

      JSON.stringify(templates),
    );
  }, [templates, loaded]);

  function addTemplate(template) {
    setTemplates((previous) => [
      ...previous,

      {
        ...template,

        id: Date.now(),
      },
    ]);
  }

  function createTemplateFromSetup(setupData, name, organization, department) {
    const template = {
      name,

      category: "Company",

      favorite: false,

      description: "",

      profile: setupData.profile,

      computer: {
        organization: {
          id: organization.id,
          name: organization.name,
          code: organization.code,
        },

        department: {
          id: department.id,
          name: department.name,
        },

        type: setupData.computer.type,
      },

      accounts: setupData.accounts,

      software: setupData.software,

      printers: setupData.printers,

      options: setupData.options,
    };

    addTemplate(template);
  }

  function deleteTemplate(id) {
    setTemplates((previous) =>
      previous.filter((template) => template.id !== id),
    );
  }

  function updateTemplate(updatedTemplate) {
    setTemplates((previousTemplates) =>
      previousTemplates.map((template) =>
        template.id === updatedTemplate.id ? updatedTemplate : template,
      ),
    );
  }

  function toggleFavorite(id) {
    setTemplates((previousTemplates) =>
      previousTemplates.map((template) =>
        template.id === id
          ? {
              ...template,

              favorite: !template.favorite,
            }
          : template,
      ),
    );
  }

  return (
    <TemplateContext.Provider
      value={{
        templates,

        addTemplate,

        createTemplateFromSetup,

        updateTemplate,

        deleteTemplate,

        toggleFavorite
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
}
