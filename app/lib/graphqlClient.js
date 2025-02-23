// lib/graphqlClient.js
import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_API_URL;

export const graphQLClient = new GraphQLClient(endpoint);