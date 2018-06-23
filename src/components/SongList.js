import React, { Component } from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import RelayPropTypes from 'react-relay/lib/RelayPropTypes';
import deleteSongMutation from '../mutations/deleteSong';

import Link from './Link';

class SongList extends Component {
  static contextTypes = {
    relay: RelayPropTypes.Relay,
  };

  onSongDelete(id) {
    deleteSongMutation.commit(this.context.relay.environment, id);
  }

  renderSongs() {
    return this.props.data.songs.reduce((result, song) => {
      if (song) {
        result.push(
          <li
            key={song.id}
            className="collection-item"
          >
            <Link href={`/songDetails/${song.id}`}>
              {song.title}
            </Link>
            <i
              className="material-icons"
              onClick={() => this.onSongDelete(song.id)}
            >
                delete
            </i>
          </li>
        );
      }
      return result;
    },[]);
  }

  render() {
    return (
      <div>
        <ul className="collection">
          {this.renderSongs()}
        </ul>
        <Link
          href="/createSong"
          className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

export default createFragmentContainer(
  SongList,
  graphql`
    fragment SongList on RootQueryType {
      songs {
        id
        title
      }
    }
  `,
);
