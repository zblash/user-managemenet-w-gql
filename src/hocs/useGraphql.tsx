import * as React from 'react';
import { useQuery, DocumentNode, QueryHookOptions, useApolloClient } from '@apollo/client';
import { GraphqlLoadingCounter } from '@/hocs/graphql-loading-counter';
import { useLoadingContext } from '@/contexts/loading-context';

export const useGraphql = (query: DocumentNode, options?: QueryHookOptions) => {
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
      GraphqlLoadingCounter.decrementCount();
      if (GraphqlLoadingCounter.getCount() <= 0) {
        loading.hide();
      }
      if (options && options.onCompleted && typeof options.onCompleted === 'function') {
        options.onCompleted(data);
      }
    },
  });
};
