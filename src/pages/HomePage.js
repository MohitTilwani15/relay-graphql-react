/* @flow */

import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';

import HelloWorld from '../components/HelloWorld';

class HomePage extends React.Component {
  render() {
    return (
      <HelloWorld />
    );
  }
}

export default createFragmentContainer(
  HomePage,
  graphql`
    fragment HomePage on RootQueryType {
      songs {
        id
        title
      }
    }
  `,
);