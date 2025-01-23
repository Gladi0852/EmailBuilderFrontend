import React, { useEffect, useRef, useState } from "react";

function TextEditing({
  setEmailTemplateData,
  name,
  value,
  setEditData,
  color,
  colorName,
}) {
  const textareaRef = useRef(null);
  const [currentColor, setCurrentColor] = useState(color);
  const [colorList, setColorList] = useState([color]); // Use state for color list
  const [showColorInput, setShowColorInput] = useState(false); // State for showing input box
  const [newColor, setNewColor] = useState(""); // State for the new color hex code input

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditData({ name, value, type: "text" });

    setEmailTemplateData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleAddColor = () => {
    // Add the new color to the list if it's a valid color
    if (newColor && /^#[0-9A-F]{6}$/i.test(newColor)) {
      setColorList((prevList) => {
        const updatedColorList = [...prevList, newColor];
        return updatedColorList;
      });
      setShowColorInput(false);
      setNewColor(""); // Reset the input field
    } else {
      alert("Please enter a valid hex color code.");
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    setColorList([color]);
  }, [value]);

  const changeColor = (c) => {
    // console.log("color - ",colorName)
    setEmailTemplateData((prevState) => ({
      ...prevState,
      [colorName]: c,
    }));
  };

  return (
    <div className="p-5">
      <h3 className="text-xl text-[#38BDF8]">
        <u>Edit Mode</u>
      </h3>
      {name ? (
        <div>
          <div className="mt-5 bg-[#D3D3D3]">
            <label className="text-lg pl-2">Edit the - {name}</label>
            <textarea
              ref={textareaRef}
              onChange={handleChange}
              onInput={handleInput}
              name={name}
              value={value}
              className="bg-transparent w-full h-auto p-2 resize-none outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 my-5">
            {colorList.map((c, index) => (
              <div
                key={index}
                style={{ backgroundColor: c }}
                className="w-10 aspect-square border-2 cursor-pointer"
                onClick={() => changeColor(c)} // Change color when clicked
              ></div>
            ))}
            <div
              className="w-10 aspect-square border-2 flex justify-center items-center cursor-pointer"
              onClick={() => setShowColorInput(true)}
            >
              +
            </div>
          </div>

          {/* Input box for new color */}
          {showColorInput && (
            <div className="mt-3">
              <input
                type="text"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                placeholder="Enter hex color code"
                className="border p-2"
              />
              <button
                onClick={handleAddColor}
                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Color
              </button>
              <button
                onClick={() => setShowColorInput(false)}
                className="ml-2 bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>Click on the section to edit</p>
      )}
    </div>
  );
}

export default TextEditing;
