import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getAuthToken } from "./auth";

const httpLink = createHttpLink({
  uri: "https://resom-api.resom.com.br/graphql/",
});

const authLink = setContext(async (_, { headers }) => {
  const token = await getAuthToken(); // Get valid token (refresh if expired)

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
