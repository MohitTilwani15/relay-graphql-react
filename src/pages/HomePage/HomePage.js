/* @flow */

import React from 'react';

import SongList from '../../components/SongList';

class HomePage extends React.Component {
  render() {
    return (
      <SongList
        data={this.props.data}
      />
    );
  }
}

export default HomePage;
