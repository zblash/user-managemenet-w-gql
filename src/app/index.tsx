import * as React from 'react';
import { ToastContainer } from 'react-toastify';
import { ApolloProvider, createHttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import Routes from '@/pages';
import { LoadingContext } from '@/contexts/loading-context';
import { UILoaderComponent } from '@/components/loading';

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
  const [loading, setLoading] = React.useState(false);

  return (
    <ApolloProvider client={apolloClient}>
      <LoadingContext.Provider
        value={{
          show: () => {
            setLoading(true);
          },
          hide: () => {
            setLoading(false);
          },
        }}
      >
        {loading && <UILoaderComponent />}
        <Routes />
        <ToastContainer />
      </LoadingContext.Provider>
    </ApolloProvider>
  );
}

export default App;
