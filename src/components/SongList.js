import React, { Component } from 'react';
import { graphql, commitMutation } from 'react-relay';

class SongList extends Component {
  onSongDelete(id) {
    commit(this.props.relay.environment, id);
  }

  renderSongs() {
    return this.props.songs.reduce((result, song) => {
      if (song) {
        result.push(
          <li
            key={song.id}
            className="collection-item"
          >
            <a>
              {song.title}
            </a>
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
      <ul className="collection">
        {this.renderSongs()}
      </ul>
    );
  }
}

const mutation = graphql`
  mutation SongListMutation($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

function commit(environment, id) {
  return new Promise((resolve, reject) => {
    commitMutation(environment, {
      mutation,
      variables: { id },
      updater: (store) => {
        store.delete(id);
      },
    });
  });
}

export default SongList;