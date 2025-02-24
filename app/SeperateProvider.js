"use client";

import { ApolloProvider } from "@apollo/client";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoriteContext";
import client from "./lib/apolloClient";

export default function Providers({ children }) {
  return (
    <ApolloProvider client={client}>
      <CartProvider>
        <FavoritesProvider>{children}</FavoritesProvider>
      </CartProvider>
    </ApolloProvider>
  );
}
