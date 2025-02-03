"use client";

import Link from "next/link";
import { useState } from "react";

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });
  const [isOtpSent, setIsOtpSent] = useState(false); // Track if OTP is sent

  const isEmailFilled = formData.email.trim() !== "";
  const isOtpFilled = formData.otp.trim() !== "";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    // Simulate sending OTP
    console.log("OTP sent to:", formData.email);
    setIsOtpSent(true);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    // Simulate OTP verification
    console.log("OTP verified:", formData.otp);
    alert("OTP Verified. Login successful!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black mt-[-350px] bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white relative p-7 rounded-lg w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute right-2 top-1 text-red-700 hover:text-gray-600"
        >
          ✕
        </button>
        <div className="flex justify-between">
          <div>
            <h2 className="text-base text-[#1A1919]">Are you an existing user?</h2>
            <p className="text-[#1A1919] mb-4">Please log in first</p>
          </div>
          <div>
            <Link
              href="/registration"
              onClick={onClose}
              className="text-[#1A1919] font-semibold"
            >
              Registration
            </Link>
          </div>
        </div>
        <form>
          {!isOtpSent ? (
            <>
              {/* Email Input */}
              <input
                type="text"
                name="email"
                placeholder="Please enter email"
                className="w-full p-2 bg-[#F0F0F0] border border-[#1A1919] rounded-lg mb-4"
                value={formData.email}
                onChange={handleInputChange}
              />
              <button
                disabled={!isEmailFilled}
                onClick={handleSendOtp}
                className={`w-full py-2 rounded-lg transition ${
                  isEmailFilled
                    ? "bg-black text-white"
                    : "bg-[#D9D9D9] text-white cursor-not-allowed"
                }`}
              >
                Send OTP
              </button>
            </>
          ) : (
            <>
              {/* OTP Input */}
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                className="w-full p-2 bg-[#F0F0F0] border border-[#1A1919] rounded-lg mb-4"
                value={formData.otp}
                onChange={handleInputChange}
              />
              <button
                disabled={!isOtpFilled}
                onClick={handleVerifyOtp}
                className={`w-full py-2 rounded-lg transition ${
                  isOtpFilled
                    ? "bg-black text-white"
                    : "bg-[#D9D9D9] text-white cursor-not-allowed"
                }`}
              >
                Continue
              </button>
            </>
          )}
        </form>
        <p className="text-sm text-gray-500 mt-4">
          By continuing, I agree to their{" "}
          <a href="#" className="text-gray-500 underline">
            privacy and policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
