import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function RenderTemplate() {
  // const imageUrl = "http://localhost:8080/Images/";
  const imageUrl = "https://email-builder-backend-three.vercel.app/Images/";
  const [data, setData] = useState();
  const navigate = useNavigate();
  const [renderedHtml, setRenderedHtml] = useState("");

  const getData = async () => {
    const id = sessionStorage.getItem("id");
    // const baseUrl = "http://localhost:8080/";
    const baseUrl = "https://email-builder-backend-three.vercel.app";
    if (!id) {
      navigate("/emailBuild");
    }
    try {
      const response = await axios.get(`${baseUrl}download/${id}`);
      setData(response.data);
    } catch (error) {
      console.error("Error sending download request:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data) {
      const { htmlContent, emailObject } = data;
      console.log(htmlContent);
      let updatedHtml = htmlContent;

      console.log(emailObject.logoUrl);
      const replacements = {
        logoUrl: imageUrl + emailObject.logoUrl,
        title: emailObject.title,
        titleColor: emailObject.titleColor,
        subtitle: emailObject.subtitle,
        subTitleColor: emailObject.subTitleColor,
        bodyContent: emailObject.bodyContent,
        bodyContentColor: emailObject.bodyContentColor,
        bodyImageUrl: imageUrl + emailObject.bodyImageUrl,
        footerText: emailObject.footerText,
        footerTextColor: emailObject.footerTextColor,
      };

      // Replace placeholders in HTML content
      Object.keys(replacements).forEach((key) => {
        const placeholder = `{{${key}}}`;
        const value = replacements[key];
        updatedHtml = updatedHtml.replace(new RegExp(placeholder, "g"), value);
      });

      // Set the final rendered HTML content
      setRenderedHtml(updatedHtml);
    }
  }, [data]);
  const handleBack = () => {
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("id");
    navigate("/");
  };

  return (
    <div>
      {/* Render the HTML content */}
      {renderedHtml ? (
        <div
          dangerouslySetInnerHTML={{ __html: renderedHtml }}
          className="py-10"
        />
      ) : (
        <p>Loading...</p>
      )}
      <div className="w-full flex justify-center items-center my-10">
        <motion.button
          whileTap={{ scale: 0.8 }}
          className="bg-[#38BDF8] text-base px-3 py-1 rounded-xl"
          onClick={handleBack}
        >
          Close
        </motion.button>
      </div>
    </div>
  );
}

export default RenderTemplate;
