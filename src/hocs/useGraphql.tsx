import * as React from 'react';
import {
  useQuery,
  DocumentNode,
  QueryHookOptions,
  useApolloClient,
  useMutation,
  MutationHookOptions,
} from '@apollo/client';
import { GraphqlLoadingCounter } from '@/hocs/graphql-loading-counter';
import { useLoadingContext } from '@/contexts/loading-context';

const graphqlOnCompletedCallback = (loadingContext, options, data) => {
  GraphqlLoadingCounter.decrementCount();
  if (GraphqlLoadingCounter.getCount() <= 0) {
    loadingContext.hide();
  }
  if (options && options.onCompleted && typeof options.onCompleted === 'function') {
    options.onCompleted(data);
  }
};

export const useGraphqlQuery = (query: DocumentNode, options?: QueryHookOptions) => {
  const loading = useLoadingContext();
  const client = useApolloClient();
  React.useEffect(() => {
    GraphqlLoadingCounter.incrementCount();
    const cachedQuery = client.readQuery({
      query,
      ...options,
    });

    if (cachedQuery === null) {
      loading.show();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useQuery(query, {
    ...options,
    onCompleted: data => {
      graphqlOnCompletedCallback(loading, options, data);
    },
  });
};

export const useGraphqlMutation = (mutation: DocumentNode, options?: MutationHookOptions) => {
  const loading = useLoadingContext();

  const [
    mutate,
    { loading: mutateLoading, data: mutateData, error: mutateError, called: isMutationCalled },
  ] = useMutation(mutation, {
    ...options,
    onCompleted: data => {
      graphqlOnCompletedCallback(loading, options, data);
    },
  });
  React.useEffect(() => {
    if (mutateLoading !== undefined) {
      if (mutateLoading) {
        GraphqlLoadingCounter.incrementCount();
        loading.show();
      }
    }
  }, [loading, mutateLoading]);

  return { mutate, mutateLoading, mutateData, mutateError, isMutationCalled };
};
