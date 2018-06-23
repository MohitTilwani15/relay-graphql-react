import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RelayPropTypes from 'react-relay/lib/RelayPropTypes';
import createSongMutation from '../mutations/createSong';

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

    createSongMutation.commit(this.context.relay.environment, this.state.songTitle)
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

export default SongCreate;
