'use client';
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import client from '../lib/apolloClient';

// Saleor Account Registration Mutation
const REGISTER_USER = gql`
  mutation RegisterUser(
    $email: String!
    $password: String!
    $redirectUrl: String!
    $metadata: [MetadataInput!]!
  ) {
    accountRegister(
      input: {
        email: $email
        password: $password
        redirectUrl: $redirectUrl
        metadata: $metadata
      }
    ) {
      user {
        id
        email
      }
      accountErrors {
        field
        message
      }
    }
  }
`;

export default function RegisterPage() {
  // State for Form Data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    country: '',
  });

  const [registerUser, { loading, error, data }] = useMutation(REGISTER_USER, { client });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleRegister = async (e) => {
    e.preventDefault();
    const redirectUrl = "https://www.resom.com.br/account-confirmation"; // Update this URL as needed

    // Store additional user data in metadata
    const metadata = [
      { key: "firstName", value: formData.firstName },
      { key: "lastName", value: formData.lastName },
      { key: "phone", value: formData.phone },
      { key: "address", value: formData.address },
      { key: "city", value: formData.city },
      { key: "zip", value: formData.zip },
      { key: "country", value: formData.country }
    ];

    try {
      await registerUser({ 
        variables: { 
          email: formData.email, 
          password: formData.password, 
          redirectUrl, 
          metadata 
        } 
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold">Register</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="zip"
          value={formData.zip}
          onChange={handleChange}
          placeholder="ZIP Code"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
          required
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      {error && <p className="text-red-500">{error.message}</p>}

      {data?.accountRegister?.accountErrors.map((err, index) => (
        <p key={index} className="text-red-500">
          {err.field ? `${err.field}: ${err.message}` : err.message}
        </p>
      ))}

      {data?.accountRegister?.user && (
        <p className="text-green-500">Registration successful! Check your email to confirm your account.</p>
      )}
    </div>
  );
}
