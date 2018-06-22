import React from 'react';
import { graphql } from 'relay-runtime';

export default [{
  path: '/songDetails/:id',
  components: () => [import('./SongDetails')],
  query: graphql`
    query SongDetailsQuery($id: ID!) {
    ...SongDetails @arguments(id: $id)
    }
  `,
  render: ([SongDetails], data) => ({
    title: 'Song Details',
    component: <SongDetails data={data} />,
    chunks: ['SongDetails'],
  }),
}];