/* @flow */

import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';

import SongList from '../components/SongList';

class HomePage extends React.Component {
  render() {
    return (
      <SongList
        songs={this.props.data.songs}
        relay={this.props.relay}
      />
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
