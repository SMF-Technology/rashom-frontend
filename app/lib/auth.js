import { gql } from "@apollo/client";
import client from "./apolloClient";

const REFRESH_TOKEN_MUTATION = gql`
  mutation TokenRefresh($refreshToken: String!) {
    tokenRefresh(refreshToken: $refreshToken) {
      token
    }
  }
`;

export const refreshAuthToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  try {
    const { data } = await client.mutate({
      mutation: REFRESH_TOKEN_MUTATION,
      variables: { refreshToken },
    });

    if (data.tokenRefresh.token) {
      // Decode the new token to get expiration time
      const tokenPayload = JSON.parse(
        atob(data.tokenRefresh.token.split(".")[1])
      );
      const newExpiry = tokenPayload.exp * 1000;

      localStorage.setItem("authToken", data.tokenRefresh.token);
      localStorage.setItem("tokenExpiry", newExpiry);

      return data.tokenRefresh.token;
    }
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
};

export const getAuthToken = async () => {
  const tokenExpiry = localStorage.getItem("tokenExpiry");
  const currentTime = Date.now();

  if (!tokenExpiry || currentTime >= tokenExpiry) {
    return await refreshAuthToken(); // Refresh token if expired
  }
  return localStorage.getItem("authToken");
};
