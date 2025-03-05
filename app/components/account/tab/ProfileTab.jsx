"use client";

import { gql, useQuery } from "@apollo/client";

const CurrentUserDocument = gql`
  query CurrentUser  {
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



  const { data, loading, error } = useQuery(CurrentUserDocument)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.me) return <p>No user data found</p>;

  const phoneMetaData = data?.me?.metadata?.find(meta => meta.key === "phone")
  const phoneNumber = phoneMetaData ? phoneMetaData?.value : "N/A"

  const addressParts = ["apartment", "block", "street", "city", "cpf", "zip", "country"]
  const metadataMap = data?.me?.metadata?.reduce((acc, meta) => {
    acc[meta.key] = meta.value
    return acc
  }, {})

  const formattedAddress = addressParts.map((key) => metadataMap[key]).filter(Boolean).join(", ")

  return (
    <div>

      <div className="p-4 bg-white rounded-md mb-5">
        <h1 className="text-2xl font-medium">Personal Information</h1>

        <p className="mt-3">{data?.me?.firstName} {data?.me?.lastName}</p>
      </div>

      <div className="p-4 bg-white rounded-md mb-5">
        <h1 className="text-2xl font-medium">Address</h1>

        <p className="mt-3"> {formattedAddress || "Address not available"}</p>
      </div>

      <div className="p-4 bg-white rounded-md mb-5">
        <h1 className="text-2xl font-medium">Contact Information</h1>

        <p className="mt-3"> Email : {data?.me?.email}</p>
        <p className="mt-3"> Phone : {phoneNumber}</p>
      </div>





    </div>
  );
}