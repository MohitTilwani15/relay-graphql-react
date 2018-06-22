import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RelayPropTypes from 'react-relay/lib/RelayPropTypes';
import { graphql, commitMutation } from 'react-relay';

class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { songTitle: '' };
  }

  static contextTypes = {
    history: PropTypes.object.isRequired,
    relay: RelayPropTypes.Relay,
  };

  onSongSubmit(event) {
    event.preventDefault();

    commit(this.context.relay.environment, this.state.songTitle)
      .then(() => {
        this.context.history.push('./')
      });
  }

  render() {
    return (
      <form onSubmit={(e) => this.onSongSubmit(e)}>
        <input
          value={this.state.songTitle}
          onChange={(event) => this.setState({ songTitle: event.target.value })}
        />
      </form>
    );
  }
}

const mutation = graphql`
  mutation SongCreatePageMutation($title: String) {
    addSong(title: $title) {
      id
    }
  }
`;

function commit(environment, title) {
	return new Promise((resolve, reject) => {
		commitMutation(environment, {
			mutation,
      variables: { title },
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

export default SongCreate;
