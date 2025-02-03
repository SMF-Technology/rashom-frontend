'use client';
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import client from '../lib/apolloClient';

const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!, $redirectUrl: String!) {
    accountRegister(input: {
      email: $email
      password: $password
      redirectUrl: $redirectUrl
    }) {
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerUser, { loading, error, data }] = useMutation(REGISTER_USER, { client });

  const handleRegister = async (e) => {
    e.preventDefault();
    const redirectUrl = "https://www.resom.com.br/account-confirmation"; // Updated URL

    try {
      await registerUser({ variables: { email, password, redirectUrl } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold">Register</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
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
