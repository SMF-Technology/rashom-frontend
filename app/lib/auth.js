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
  if (!refreshToken) {
    console.log("refreshAuthToken - No refreshToken found in localStorage");
    return null;
  }

  try {
    const { data } = await client.mutate({
      mutation: REFRESH_TOKEN_MUTATION,
      variables: { refreshToken },
    });

    console.log("refreshAuthToken - GraphQL response:", data);

    if (data.tokenRefresh.token) {
      const tokenPayload = JSON.parse(
        atob(data.tokenRefresh.token.split(".")[1])
      );
      const newExpiry = tokenPayload.exp * 1000;

      console.log("refreshAuthToken - New token expiry:", newExpiry);

      localStorage.setItem("authToken", data.tokenRefresh.token);
      localStorage.setItem("tokenExpiry", newExpiry);

      return data.tokenRefresh.token;
    } else {
      console.error("refreshAuthToken - No token received from server");
    }
  } catch (error) {
    console.error("refreshAuthToken - Token refresh failed:", error);
    if (error.graphQLErrors) {
      console.error("refreshAuthToken - GraphQL Errors:", error.graphQLErrors);
    }
  }
  return null;
};
export const getAuthToken = async () => {
  const authToken = localStorage.getItem("authToken");
  const tokenExpiry = localStorage.getItem("tokenExpiry");
  const currentTime = Date.now();
  const refreshBuffer = 60 * 1000; // 1 minute buffer

  console.log("getAuthToken - authToken:", authToken);
  console.log("getAuthToken - tokenExpiry:", tokenExpiry);
  console.log("getAuthToken - currentTime:", currentTime);

  if (!authToken) {
    console.log("getAuthToken - No authToken, refreshing...");
    return await refreshAuthToken();
  }

  if (tokenExpiry && parseInt(tokenExpiry) - currentTime <= refreshBuffer) {
    console.log("getAuthToken - Token expiring soon, refreshing...");
    return await refreshAuthToken();
  }

  console.log("getAuthToken - Returning existing token");
  return authToken;
};
