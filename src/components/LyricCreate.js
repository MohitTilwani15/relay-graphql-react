import React, { Component } from 'react';
import RelayPropTypes from 'react-relay/lib/RelayPropTypes';
import createLyricMutation from '../mutations/createLyric';

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
    createLyricMutation.commit(this.context.relay.environment, this.state.lyrics, this.props.songId)
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

export default LyricCreate;
