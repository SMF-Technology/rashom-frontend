import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getAuthToken, refreshAuthToken } from "./auth";

const httpLink = createHttpLink({
  uri: "https://resom-api.resom.com.br/graphql/",
});

const authLink = setContext(async (_, { headers }) => {
  let token = await getAuthToken();
  const tokenExpiry = localStorage.getItem("tokenExpiry");
  const currentTime = Date.now();

  console.log("authLink - tokenExpiry:", tokenExpiry);
  console.log("authLink - currentTime:", currentTime);

  if (tokenExpiry && currentTime >= parseInt(tokenExpiry)) {
    console.log("authLink - Token expired, refreshing...");
    token = await refreshAuthToken(); // Refresh if expired
  }

  if (!token) {
    console.log("authLink - no token found.");
    return {
      headers: {
        ...headers,
      },
    };
  }

  console.log("authLink - Token being sent:", token);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
