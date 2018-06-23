/* @flow */

import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';

import LyricsList from '../../components/LyricsList';
import LyricCreate from '../../components/LyricCreate';

class SongDetails extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <LyricCreate songId={this.props.data.song.id} />
        <LyricsList
          lyrics={this.props.data.song.lyrics}
        />
      </div>
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
          likes
        }
      }
    }
  `,
);
