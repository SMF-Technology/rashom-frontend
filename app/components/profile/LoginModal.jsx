"use client";

import Link from "next/link";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import client from "../../lib/apolloClient";
import { useRouter } from "next/navigation";

// GraphQL Login Mutation
const LOGIN_USER = gql`
  mutation TokenCreate($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      token
      refreshToken
      user {
        id
        email
        isActive
      }
      accountErrors {
        field
        message
      }
    }
  }
`;

const LoginModal = ({ isOpen, onClose, setUserEmail }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const [loginUser, { loading }] = useMutation(LOGIN_USER, { client });

  const isEmailFilled = formData.email.trim() !== "";
  const isPasswordFilled = formData.password.trim() !== "";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await loginUser({
        variables: { ...formData },
      });

      if (data.tokenCreate.accountErrors.length > 0) {
        setError(data.tokenCreate.accountErrors[0].message);
      } else {
        const { token, refreshToken, user } = data.tokenCreate;

        // Save tokens and user email to localStorage
        localStorage.setItem("authToken", token);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userEmail", user.email);

        // Update userEmail state in the parent component
        setUserEmail(user.email);

        // Close modal after successful login
        onClose();

        // Redirect to home page
        router.push("/");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    }
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
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Please enter email"
            className="w-full p-2 bg-[#F0F0F0] border border-[#1A1919] rounded-lg mb-4"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="w-full p-2 bg-[#F0F0F0] border border-[#1A1919] rounded-lg mb-4"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading || !isEmailFilled || !isPasswordFilled}
            className={`w-full py-2 rounded-lg transition ${
              isEmailFilled && isPasswordFilled
                ? "bg-black text-white"
                : "bg-[#D9D9D9] text-white cursor-not-allowed"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-4">
          By continuing, I agree to their {" "}
          <a href="#" className="text-gray-500 underline">
            privacy and policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;