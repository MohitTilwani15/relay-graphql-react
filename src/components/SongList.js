import React, { Component } from 'react';

class SongList extends Component {
  renderSongs() {
    return this.props.songs.map(({ id, title }) => {
      return (
        <li
          key={id}
          className="collection-item"
        >
          <a>
            {title}
          </a>
          <i
            className="material-icons"
          >
              delete
          </i>
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="collection">
        {this.renderSongs()}
      </ul>
    );
  }
}

export default SongList;