
export const emailBuilderLoader = async () => {
  const userEmail = sessionStorage.getItem("userEmail");

  if (!userEmail) {
    return { redirectToHome: true }; // Flag to redirect when no userEmail
  }

  const templateData = await fetchTemplateData();

  return { userEmail, templateData };
};

const fetchTemplateData = async () => {
  try {
    const response = await fetch("https://email-builder-backend-three.vercel.app/getEmailLayout");

    if (!response.ok) {
      throw new Error("Failed to fetch template data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching template data:", error);
    return null;
  }
};

