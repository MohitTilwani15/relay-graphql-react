import React, { Component } from 'react';
import { graphql, commitMutation } from 'react-relay';
import RelayPropTypes from 'react-relay/lib/RelayPropTypes';

class LyricCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { lyrics: '' };
  }

  static contextTypes = {
    relay: RelayPropTypes.Relay,
  };

  onLyricsSubmit(e) {
    e.preventDefault();
    commit(this.context.relay.environment, this.state.lyrics, this.props.songId)
      .then(() => {
        console.log('lyrics created');
        this.setState({ lyrics: '' });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <form onSubmit={(e) => this.onLyricsSubmit(e)}>
        <input
          value={this.state.lyrics}
          onChange={(event) => this.setState({ lyrics: event.target.value })}
        />
      </form>
    );
  }
}

const mutation = graphql`
  mutation LyricCreateMutation($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

function commit(environment, content, songId) {
  return new Promise((resolve, reject) => {
    commitMutation(environment, {
      mutation,
      variables: { content, songId },
      onCompleted(response, errors) {
        if (errors) {
          reject(errors[0]);
        } else {
          resolve(response);
        }
      },
      onError: reject,
    });
  });
}

export default LyricCreate;