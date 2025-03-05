// // "use client"
// // import { useState } from "react";
// // import { useAuthContext } from "../auth/authProvider";


// // const LoginPage = () => {
// //   const { handleLogin } = useAuthContext();
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");

// //   const submitLogin = async (e) => {
// //     e.preventDefault();
// //     const response = await handleLogin(email, password);
// //     if (!response.success) {
// //       setError(response.errors?.[0]?.message || "Login failed");
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Login</h2>
// //       {error && <p style={{ color: "red" }}>{error}</p>}
// //       <form onSubmit={submitLogin}>
// //         <input
// //           type="email"
// //           placeholder="Email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           required
// //         />
// //         <input
// //           type="password"
// //           placeholder="Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           required
// //         />
// //         <button type="submit">Login</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default LoginPage;


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

import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page