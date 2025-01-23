import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { color, motion } from "framer-motion";
import TextEditing from "./TextEditing";
import PhotoEditing from "./PhotoEditing";
import axios from "axios";

function MakeTemplate() {
  const { userEmail, templateData, redirectToHome } = useLoaderData();
  const navigate = useNavigate();
  // const baseUrl = "http://localhost:8080/";
  const baseUrl = "https://email-builder-backend-three.vercel.app/";

  const [emailTemplateData, setEmailTemplateData] = useState({
    logoUrl: "",
    title: "",
    titleColor: "",
    subtitle: "",
    subTitleColor: "",
    bodyContent: "",
    bodyContentColor: "",
    bodyImageUrl: "",
    footerText: "",
    footerTextColor: "",
  });

  const [editData, setEditData] = useState({
    name: "",
    value: "",
    type: "text", // 'text' or 'photo'
    color: "",
    colorName: "",
  });

  const openEditMode = (name, value, type = "text", color, colorName) => {
    setEditData({ name, value, type, color, colorName });
  };

  useEffect(() => {
    if (redirectToHome) {
      navigate("/");
    }
    if (templateData?.emailObject) {
      const data = templateData.emailObject[0] || {};
      setEmailTemplateData({
        logoUrl: data.logoUrl || "",
        title: data.title || "",
        titleColor: data.titleColor || "#fff",
        subtitle: data.subtitle || "",
        subTitleColor: data.subTitleColor || "#2563EB",
        bodyContent: data.bodyContent || "",
        bodyContentColor: data.bodyContentColor || "#000",
        bodyImageUrl: data.bodyImageUrl || "",
        footerText: data.footerText || "",
        footerTextColor: data.footerTextColor || "#000",
      });
    }
  }, [redirectToHome, navigate, templateData]);

  const handleBack = () => {
    sessionStorage.removeItem("userEmail");
    navigate("/");
  };


  const handleSave = async () => {
    const formdata = new FormData();
    try {
      formdata.append("files", emailTemplateData.logoUrl);
      formdata.append("files", emailTemplateData.bodyImageUrl);
      formdata.append("email", userEmail);
      formdata.append("title", emailTemplateData.title);
      formdata.append("titleColor", emailTemplateData.titleColor);
      formdata.append("subtitle", emailTemplateData.subtitle);
      formdata.append("subTitleColor", emailTemplateData.subTitleColor);
      formdata.append("bodyContent", emailTemplateData.bodyContent);
      formdata.append("bodyContentColor", emailTemplateData.bodyContentColor);
      formdata.append("footerText", emailTemplateData.footerText);
      formdata.append("footerTextColor", emailTemplateData.footerTextColor);

      const response = await axios.post(`${baseUrl}savetemplate`, formdata);
      if (response.status === 201) {
        alert("Template saved successfully!");
        sessionStorage.setItem("id",response.data.id)
        navigate("/download")
      }
    } catch (error) {
      console.error("Error saving template:", error);
      alert("Error saving template.");
    }
  };
  return (
    <div>
      <div className="w-full bg-[#34322F] h-16 flex justify-between items-center px-20">
        <motion.button
          whileTap={{ scale: 0.8 }}
          className="bg-[#38BDF8] text-base px-3 py-1 rounded-xl"
          onClick={handleBack}
        >
          Go Back
        </motion.button>
        <p className="text-white text-lg">User - {userEmail}</p>
      </div>
      <div className="flex justify-between my-10 px-20">
        <div className="show-ui w-3/5 border gap-x-10 py-5">
          <div className="mx-auto bg-[#f6f4f4] shadow-lg rounded-lg w-2/3 py-5">
            {/* <!-- Logo Section --> */}
            <div className="py-3 cursor-pointer hover:border-2 hover:border-green-500">
              <img
                src={
                  typeof emailTemplateData.logoUrl == "string"
                    ? baseUrl + emailTemplateData.logoUrl
                    : URL.createObjectURL(emailTemplateData.logoUrl)
                }
                alt="Company Logo"
                className="mx-auto w-1/5 rounded-full"
                onClick={() =>
                  openEditMode(
                    "logoUrl",
                    emailTemplateData.logoUrl,
                    "photo",
                    "",
                    ""
                  )
                }
              />
            </div>

            {/* <!-- Title Section --> */}
            <div
              className={`bg-blue-600 text-center py-3 cursor-pointer hover:border-2 hover:border-green-500`}
              onClick={() =>
                openEditMode(
                  "title",
                  emailTemplateData.title,
                  "text",
                  emailTemplateData.titleColor,
                  "titleColor"
                )
              }
            >
              <h1
                className={`text-2xl font-bold`}
                style={{ color: emailTemplateData.titleColor }}
              >
                {emailTemplateData.title}
              </h1>
            </div>

            {/* <!-- Body Section --> */}
            <div className="py-8 px-10 text-gray-800">
              <h2
                className="text-xl font-semibold text-blue-600 mb-4 cursor-pointer hover:border-2 hover:border-green-500"
                style={{ color: emailTemplateData.subTitleColor }}
                onClick={() =>
                  openEditMode(
                    "subtitle",
                    emailTemplateData.subtitle,
                    "text",
                    emailTemplateData.subTitleColor,
                    "subTitleColor"
                  )
                }
              >
                {emailTemplateData.subtitle}
              </h2>
              <p
                className="mb-6 cursor-pointer hover:border-2 hover:border-green-500"
                style={{ color: emailTemplateData.bodyContentColor }}
                onClick={() =>
                  openEditMode(
                    "bodyContent",
                    emailTemplateData.bodyContent,
                    "text",
                    emailTemplateData.bodyContentColor,
                    "bodyContentColor"
                  )
                }
              >
                {emailTemplateData.bodyContent}
              </p>

              {/* <!-- Body Image Section --> */}
              <div className="text-center my-4 cursor-pointer hover:border-2 hover:border-green-500">
                <img
                  src={
                    typeof emailTemplateData.bodyImageUrl == "string"
                      ? baseUrl + emailTemplateData.bodyImageUrl
                      : URL.createObjectURL(emailTemplateData.bodyImageUrl)
                  }
                  alt="Welcome Image"
                  className="w-full max-h-64 object-cover rounded-lg"
                  onClick={() =>
                    openEditMode(
                      "bodyImageUrl",
                      emailTemplateData.bodyImageUrl,
                      "photo",
                      "",
                      ""
                    )
                  }
                />
              </div>
            </div>

            {/* <!-- Footer Section --> */}
            <div className="bg-gray-100 text-gray-600 text-center py-4">
              <p
                className="text-sm cursor-pointer hover:border-2 hover:border-green-500"
                style={{ color: emailTemplateData.footerTextColor }}
                onClick={() =>
                  openEditMode(
                    "footerText",
                    emailTemplateData.footerText,
                    "text",
                    emailTemplateData.footerTextColor,
                    "footerTextColor"
                  )
                }
              >
                {emailTemplateData.footerText}
              </p>
            </div>
          </div>
        </div>

        {/* Conditional Rendering of Editor */}
        <div className="edit-ui w-1/3 border">
          {editData.type === "text" ? (
            <TextEditing
              setEmailTemplateData={setEmailTemplateData}
              name={editData.name}
              value={editData.value}
              setEditData={setEditData}
              color={editData.color}
              colorName={editData.colorName}
            />
          ) : (
            <PhotoEditing
              setEmailTemplateData={setEmailTemplateData}
              name={editData.name}
              value={editData.value}
              setEditData={setEditData}
            />
          )}
        </div>
      </div>

      <div className="w-full flex justify-center items-center my-10">
        <motion.button
          whileTap={{ scale: 0.8 }}
          className="bg-[#38BDF8] text-base px-3 py-1 rounded-xl"
          onClick={handleSave}
        >
          Save and Download
        </motion.button>
      </div>
    </div>
  );
}

export default MakeTemplate;
