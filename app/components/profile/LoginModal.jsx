
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import client from "../../lib/apolloClient";
import { useSaleorAuthContext } from "@saleor/auth-sdk/react";

const CurrentUserDocument = gql`
  query CurrentUser {
    me {
      id
      email
      firstName
      lastName
    }
  }
`;


const LoginModal = ({ isOpen, onClose, setUserEmail }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState([]);

  const { data: currentUser, loading } = useQuery(CurrentUserDocument);
  console.log("data", currentUser);

  const { signIn, signOut } = useSaleorAuthContext();

  const changeHandler = (event) => {
    const { name, value } = event.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const { data } = await signIn(formData);

    if (data?.tokenCreate?.errors?.length > 0) {
      setErrors(data.tokenCreate.errors.map((error, index) => ({ id: index, message: error.message })));
      setFormData({ email: "", password: "" });
    } else if (data?.tokenCreate?.token) {
      // Login was successful
      setUserEmail(currentUser?.me.email);
      setErrors([]);
      onClose(); // Close modal

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
            <Link href="/registration" onClick={onClose} className="text-[#1A1919] font-semibold">
              Registration
            </Link>
          </div>
        </div>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            name="email"
            placeholder="Please enter email"
            className="w-full p-2 bg-[#F0F0F0] border border-[#1A1919] rounded-lg mb-4"
            value={formData.email}
            onChange={changeHandler}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="w-full p-2 bg-[#F0F0F0] border border-[#1A1919] rounded-lg mb-4"
            value={formData.password}
            onChange={changeHandler}
            required
          />
          {errors && <p className="text-red-500 text-sm">{errors}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg transition bg-black text-white"
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
// "use client";

// import { gql, useQuery } from "@apollo/client";
// import { useSaleorAuthContext } from "@saleor/auth-sdk/react";
// import React, { useState } from "react";

// const CurrentUserDocument = gql`
//   query CurrentUser {
//     me {
//       id
//       email
//       firstName
//       lastName
//     }
//   }
// `;

// const DefaultValues = { email: "", password: "" };

// const LoginModal = () => {
//   const [formValues, setFormValues] = useState(DefaultValues);
//   const [errors, setErrors] = useState([]);
//   const { data: currentUser, loading } = useQuery(CurrentUserDocument);
//   const { signIn, signOut } = useSaleorAuthContext();

//   const changeHandler = (event) => {
//     const { name, value } = event.currentTarget;
//     setFormValues((prev) => ({ ...prev, [name]: value }));
//   };

//   const submitHandler = async (event) => {
//     event.preventDefault();

//     const { data } = await signIn(formValues);

//     if (data?.tokenCreate?.errors?.length > 0) {
//       setErrors(data.tokenCreate.errors.map((error, index) => ({ id: index, message: error.message })));
//       setFormValues(DefaultValues);
//     }
//   };

//   return (
//     <div>
//       {currentUser?.me ? (
//         <div>
//           <h1>Display user {JSON.stringify(currentUser)}</h1>
//           <button className="button" onClick={() => signOut()}>
//             Logout
//           </button>
//         </div>
//       ) : (
//         <div>
//           <form onSubmit={submitHandler}>
//             <input type="email" name="email" placeholder="Email" onChange={changeHandler} />
//             <input type="password" name="password" placeholder="Password" onChange={changeHandler} />
//             <button className="button" type="submit">
//               Login
//             </button>
//           </form>
//           {errors.length > 0 && (
//             <ul>
//               {errors.map((error) => (
//                 <li key={error.id} className="error">
//                   {error.message}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LoginModal;
