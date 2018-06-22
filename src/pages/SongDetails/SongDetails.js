/* @flow */

import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';

import LyricsList from '../../components/LyricsList';

class SongDetails extends React.Component {
  render() {
    console.log(this.props);
    return (
      <LyricsList
        lyrics={this.props.data.song.lyrics}
      />
    );
  }
}

export default createFragmentContainer(
  SongDetails,
  graphql`
    fragment SongDetails on RootQueryType @argumentDefinitions(
      id: { type: "ID!" },
    ) {
      song(id: $id) {
        id
        lyrics {
          id
          content
        }
      }
    }
  `,
);
