import * as React from 'react';
import { useQuery, DocumentNode, QueryHookOptions } from '@apollo/client';
import { GraphqlLoadingCounter } from '@/hocs/graphql-loading-counter';

export const useGraphql = (query: DocumentNode, options?: QueryHookOptions) => {
  React.useEffect(() => {
    GraphqlLoadingCounter.incrementCount();
  }, []);

  return useQuery(query, {
    ...options,
    onCompleted: data => {
      GraphqlLoadingCounter.decrementCount();
      options.onCompleted(data);
    },
  });
};
