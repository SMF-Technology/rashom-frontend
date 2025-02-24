"use client";

import { gql, useQuery } from "@apollo/client";

const GET_USER_DATA = gql`
  query GetUserData {
    me {
      id
      email
      firstName
      lastName
      metadata {
        key
        value
      }
    }
  }
`;

export default function ProfileTab() {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const { loading, error, data } = useQuery(GET_USER_DATA, {
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.me) return <p>No user data found</p>;

  console.log(data.me);
  

  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>Email:</strong> {data?.me?.email || "N/A"}</p>
      <p><strong>First Name:</strong> {data?.me?.firstName || "N/A"}</p>
      <p><strong>Last Name:</strong> {data?.me?.lastName || "N/A"}</p>
      <h3>Metadata:</h3>
      <ul>
        {data?.me?.metadata?.map((meta, index) => (
          <li key={index}>
            <strong>{meta.key}:</strong> {meta.value}
          </li>
        )) || <p>No metadata available</p>}
      </ul>
    </div>
  );
}
