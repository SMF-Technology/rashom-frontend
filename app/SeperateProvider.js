"use client";

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoriteContext";
import { createSaleorAuthClient } from "@saleor/auth-sdk";
import { SaleorAuthProvider, useAuthChange } from "@saleor/auth-sdk/react";

const saleorApiUrl = `https://resom-api.resom.com.br/graphql/`;

const saleorAuthClient = createSaleorAuthClient({ saleorApiUrl });

const httpLink = createHttpLink({
  uri: saleorApiUrl,
  fetch: saleorAuthClient.fetchWithAuth,
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default function Providers({ children }) {
  useAuthChange({
    saleorApiUrl,
    onSignedOut: () => {
      apolloClient.resetStore();
    },
    onSignedIn: () => {
      apolloClient.refetchQueries({ include: "active" });
    },
  });

  return (
    <SaleorAuthProvider client={saleorAuthClient}>
      <ApolloProvider client={apolloClient}>
        <CartProvider>
          <FavoritesProvider>{children}</FavoritesProvider>
        </CartProvider>
      </ApolloProvider>
    </SaleorAuthProvider>
  );
}
