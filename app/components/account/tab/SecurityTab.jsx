"use client";

import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

// Define GraphQL Mutations
const REQUEST_PASSWORD_RESET = gql`
  mutation RequestPasswordReset($email: String!, $redirectUrl: String!) {
    requestPasswordReset(email: $email, redirectUrl: $redirectUrl) {
      errors {
        field
        message
      }
    }
  }
`;

const SET_NEW_PASSWORD = gql`
  mutation SetPassword($token: String!, $password: String!) {
    setPassword(token: $token, password: $password) {
      errors {
        field
        message
      }
      user {
        id
        email
      }
    }
  }
`;

const CHANGE_PASSWORD = gql`
  mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
    passwordChange(oldPassword: $oldPassword, newPassword: $newPassword) {
      errors {
        field
        message
      }
    }
  }
`;

const SecurityTab = () => {
    const [showResetForm, setShowResetForm] = useState(false);
    const [showForgetForm, setShowForgetForm] = useState(false);
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [resetToken, setResetToken] = useState(""); // Token from reset email

    const [requestPasswordReset, { data: resetData, loading: resetLoading, error: resetError }] =
        useMutation(REQUEST_PASSWORD_RESET);

    const [setPassword, { data: setPasswordData, loading: setPasswordLoading, error: setPasswordError }] =
        useMutation(SET_NEW_PASSWORD);

    // Function to validate the email format


    const [changePassword, { data: changeData, loading: changeLoading, error: changeError }] =
        useMutation(CHANGE_PASSWORD);

    // Function to validate the email format
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Function to handle reset button click
    const handleResetClick = () => {
        setShowResetForm(true);
        setShowForgetForm(false);
    };

    // Function to handle forget button click
    const handleForgetClick = () => {
        setShowForgetForm(true);
        setShowResetForm(false);
    };

    const handleRequestReset = async () => {
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        try {
            await requestPasswordReset({
                variables: {
                    email,
                    redirectUrl: `https://www.resom.com.br/reset-password`, // Redirect URL
                },
            });
            alert("Password reset link sent to your email.");
        } catch (error) {
            console.error("Error during password reset:", error);
            alert("An error occurred while requesting a password reset. Please try again.");
        }
    };

    // Set new password after reset
    const handleSetNewPassword = async () => {
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            await setPassword({
                variables: {
                    token: resetToken,
                    password: newPassword,
                },
            });
            alert("Password successfully reset!");
        } catch (error) {
            console.error("Error setting new password:", error);
            alert("Failed to reset password. Please try again.");
        }
    };
    // Change existing password
    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            await changePassword({ variables: { oldPassword, newPassword } });
            alert("Password changed successfully!");
        } catch (error) {
            console.error("Error changing password:", error);
            alert("Failed to change password. Please try again.");
        }
    };

    return (
        <div>
            <p>Password</p>
            <p>*********</p>

            <p className="text-red-600">
                <span className="inline-flex items-center justify-center w-6 h-6 border border-red-600 rounded-full text-sm font-bold">!</span>
                &nbsp; You already have a password. Do you want to
                <span className="underline cursor-pointer ml-1" onClick={handleResetClick}>reset</span> it or
                <span className="underline cursor-pointer ml-1" onClick={handleForgetClick}>forget</span>?
            </p>

            {/* Reset Password Form */}
            {showResetForm && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Reset Password</h3>
                    <input type="password" placeholder="Old Password" className="border p-2 rounded-lg w-full my-2" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                    <input type="password" placeholder="New Password" className="border p-2 rounded-lg w-full my-2" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    <input type="password" placeholder="Confirm Password" className="border p-2 rounded-lg w-full my-2" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button className="px-4 py-2 bg-black text-white rounded" onClick={handleChangePassword}>Reset Password</button>
                    {changeLoading && <p>Loading...</p>}
                    {changeError && <p className="text-red-600">{changeError.message}</p>}
                </div>
            )}

            {/* Forgot Password Form */}
            {showForgetForm && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Forgot Password</h3>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="border p-2 rounded-lg w-full my-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        className="px-4 py-2 bg-black text-white rounded"
                        onClick={handleRequestReset}
                        disabled={resetLoading}
                    >
                        {resetLoading ? "Sending..." : "Send Reset Link"}
                    </button>
                    {resetError && <p className="text-red-600">{resetError.message}</p>}

                    <h3 className="text-lg font-semibold mt-4">Enter New Password</h3>
                    <input
                        type="text"
                        placeholder="Reset Token"
                        className="border p-2 rounded-lg w-full my-2"
                        value={resetToken}
                        onChange={(e) => setResetToken(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        className="border p-2 rounded-lg w-full my-2"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="border p-2 rounded-lg w-full my-2"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                        className="px-4 py-2 bg-black text-white rounded"
                        onClick={handleSetNewPassword}
                        disabled={setPasswordLoading}
                    >
                        {setPasswordLoading ? "Saving..." : "Save Password"}
                    </button>
                    {setPasswordError && <p className="text-red-600">{setPasswordError.message}</p>}
                </div>
            )}
        </div>
    );
};

export default SecurityTab;
