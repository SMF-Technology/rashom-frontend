'use client';
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import client from '../lib/apolloClient';

const REGISTER_USER = gql`
  mutation RegisterUser(
    $email: String!
    $password: String!
    $redirectUrl: String!
    $firstName: String!
    $lastName: String!
    $phone: String!
    $address: String!
    $city: String!
    $zip: String!
    $country: String!
  ) {
    accountRegister(
      input: {
        email: $email
        password: $password
        redirectUrl: $redirectUrl
        firstName: $firstName
        lastName: $lastName
        phone: $phone
        metadata: [
          { key: "address", value: $address }
          { key: "city", value: $city }
          { key: "zip", value: $zip }
          { key: "country", value: $country }
        ]
      }
    ) {
      user {
        id
        email
        firstName
        lastName
      }
      accountErrors {
        field
        message
      }
    }
  }
`;

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    country: ''
  });

  const [registerUser, { loading, error, data }] = useMutation(REGISTER_USER, { client });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const redirectUrl = "https://www.resom.com.br/account-confirmation";

    try {
      await registerUser({ variables: { ...formData, redirectUrl } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold">Register</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <input name="firstName" type="text" value={formData.firstName} onChange={handleChange} placeholder="First Name" required className="w-full p-2 border rounded" />
        <input name="lastName" type="text" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required className="w-full p-2 border rounded" />
        <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required className="w-full p-2 border rounded" />
        <input name="address" type="text" value={formData.address} onChange={handleChange} placeholder="Address" required className="w-full p-2 border rounded" />
        <input name="city" type="text" value={formData.city} onChange={handleChange} placeholder="City" required className="w-full p-2 border rounded" />
        <input name="zip" type="text" value={formData.zip} onChange={handleChange} placeholder="ZIP Code" required className="w-full p-2 border rounded" />
        <input name="country" type="text" value={formData.country} onChange={handleChange} placeholder="Country" required className="w-full p-2 border rounded" />
        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full p-2 border rounded" />
        <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="w-full p-2 border rounded" />
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
