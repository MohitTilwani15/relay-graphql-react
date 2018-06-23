import React from 'react';
import { graphql, commitMutation } from 'react-relay';
import RelayPropTypes from 'react-relay/lib/RelayPropTypes';

class LyricsList extends React.Component {
  static contextTypes = {
    relay: RelayPropTypes.Relay,
  };

  onLike(id) {
    commit(this.context.relay.environment, id);
  }

  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <li className="collection-item" key={id}>
          {content}
          <div className="vote-box">
            <i
              className="material-icons"
              onClick={() => this.onLike(id)}
            >
              thumb_up
            </i>
            {likes}
          </div>
        </li>
      );
    });
  }

  render() {
    if (!Object.keys(this.props.lyrics).length) return false;

    return (
      <ul className="collection">
        {this.renderLyrics()}
      </ul>
    );
  }
}

const mutation = graphql`
  mutation LyricsListMutation($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

function commit(environment, id) {
	return new Promise((resolve, reject) => {
		commitMutation(environment, {
			mutation,
      variables: { id },
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

export default LyricsList;