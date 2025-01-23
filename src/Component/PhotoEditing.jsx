import React, { useRef } from "react";

function PhotoEditing({ setEmailTemplateData, name, value, setEditData }) {
  const fileInputRef = useRef(null);
  // const baseUrl = "http://localhost:8080/";
  const baseUrl = "https://email-builder-backend-three.vercel.app/";

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      // Check if the uploaded file is an image
      if (file.type.startsWith("image/")) {
        setEmailTemplateData((prevState) => ({
          ...prevState,
          [name]: file, // Update with the image file
        }));
        setEditData({ name: name, value: file, type: "photo" });
      } else {
        alert("Please upload a valid image file!");
      }
    }
  };
  

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="p-5">
      <h3 className="text-xl text-[#38BDF8]">
        <u>Edit Photo</u>
      </h3>
      <div className="mt-5">
        <label className="text-lg">Edit the - {name}</label>
        <p className="mt-5 mb-5">Click on image to upload</p>
        <img
          src={typeof(value) == "string" ? baseUrl + value : URL.createObjectURL(value)}
          alt="Welcome Image"
          className="w-2/3 cursor-pointer mx-auto max-h-64 object-cover rounded-lg"
          onClick={triggerFileInput}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
}

export default PhotoEditing;
