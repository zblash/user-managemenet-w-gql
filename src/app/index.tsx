import * as React from 'react';
import { ToastContainer } from 'react-toastify';
import Routes from '@/pages';
import { ApolloProvider, createHttpLink, ApolloClient, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'https://sunny-gorilla-88.hasura.app/v1/graphql',
  headers: {
    'x-hasura-admin-secret': 'X4Hh7kQrymAVxjnw17S6e7n0PChHGbfhV2AgjqnL50aJG5u78zvcgr0no0cSCtbt',
  },
});
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Routes />
      <ToastContainer />
    </ApolloProvider>
  );
}

export default App;
