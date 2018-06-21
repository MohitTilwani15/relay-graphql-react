/* @flow */

import { Environment, Network, RecordSource, Store } from 'relay-runtime';

export default function createRelay() {
  function fetchQuery(operation, variables) {
    if (typeof window.data !== 'undefined') {
      const data = window.data;
      delete window.data;
      return Promise.resolve(data);
    }

    return fetch('/graphql', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    })
      .then(res => res.json())
      .then(payload => {
        const error = (payload.errors || []).find(x =>
          [401, 403].includes(x.code),
        );

        if (error) {
          throw error;
        }

        return payload;
      });
  }

  const recordSource = new RecordSource();
  const store = new Store(recordSource);
  const network = Network.create(fetchQuery);

  return new Environment({ store, network });
}