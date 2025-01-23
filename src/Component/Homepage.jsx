import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  useRef(() => {
    sessionStorage.removeItem("userEmail");
  }, []);
  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleGetStartedClick = () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    sessionStorage.setItem("userEmail", email);
    navigate("/emailBuild");
  };

  return (
    <div className="bg-[#F7F7F7] flex justify-center items-center w-screen h-screen">
      <div className="w-1/2 text-center shadow-custom-dark px-10 py-6">
        <div className="flex flex-col w-1/2 mx-auto mb-8">
          <label className="text-2xl text-[#38BDF8] mb-3">
            Enter Your Email
          </label>
          <input
            type="email"
            required
            className="border-none bg-slate-300 outline-none text-lg px-3 py-1"
            value={email}
            onChange={handleInputChange}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <p className="mt-3 font-light">
            To save your template for your future reference
          </p>
        </div>
        <motion.button
          whileTap={{ scale: 0.8 }}
          className="bg-[#38BDF8] text-xl px-5 py-3 rounded-xl mb-5"
          onClick={handleGetStartedClick}
        >
          Get Started
        </motion.button>
        <p className="font-light text-lg">
          Clicking on the "Get Started" button will take you to our email
          builder, where you can easily customize and create your own email
          template using our pre-designed base template. Simply edit the
          content, add your logo, and make any changes you need to tailor the
          template to your needs. Start building your professional email
          template today!
        </p>
      </div>
    </div>
  );
}

export default Homepage;
