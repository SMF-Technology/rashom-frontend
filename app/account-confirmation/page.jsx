'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { gql, useMutation } from '@apollo/client';
import client from '../lib/apolloClient';

// GraphQL Mutation for Confirming Account
const CONFIRM_ACCOUNT = gql`
  mutation ConfirmAccount($email: String!, $token: String!) {
    confirmAccount(email: $email, token: $token) {
      accountErrors {
        field
        message
      }
      user {
        id
        email
        isActive
      }
    }
  }
`;

export default function AccountConfirmation() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const [confirmAccount, { data, loading, error }] = useMutation(CONFIRM_ACCOUNT, { client });
  const [message, setMessage] = useState('Confirming your account...');

  useEffect(() => {
    if (email && token) {
      confirmAccount({ variables: { email, token } });
    } else {
      setMessage('Invalid confirmation link.');
    }
  }, [email, token, confirmAccount]);

  useEffect(() => {
    if (data?.confirmAccount?.user?.isActive) {
      setMessage('✅ Your account has been successfully confirmed!');
    } else if (data?.confirmAccount?.accountErrors?.length > 0) {
      setMessage(`❌ Error: ${data.confirmAccount.accountErrors[0].message}`);
    }
  }, [data]);

  if (loading) return <p>⏳ Confirming your account, please wait...</p>;
  if (error) return <p>❌ An unexpected error occurred: {error.message}</p>;

  return (
    <div className="max-w-md mx-auto mt-10 text-center">
      <h1 className="text-2xl font-bold">Account Confirmation</h1>
      <p className="mt-4">{message}</p>
    </div>
  );
}
