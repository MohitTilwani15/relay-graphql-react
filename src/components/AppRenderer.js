import React, { Component } from 'react';
import ErrorPage from '../pages/ErrorPage';

const defaults = {
  title: null,
  component: null,
  error: null,
};

class AppRenderer extends Component {
  state = { ...defaults };

  componentDidUpdate() {
    if (this.state.title) {
      window.document.title = this.state.title;
    }
  }

  componentDidCatch(error) {
    this.setState({ ...defaults, error });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.component !== nextState.component ||
      this.state.error !== nextState.error ||
      this.state.title !== nextState.title
    );
  }

  renderRoute = (route, cb) => {
    this.setState({ ...defaults, ...route }, cb);
  };

  render() {
    return this.state.error ? (
      <ErrorPage error={this.state.error} />
    ) : this.state.component ? (
      this.state.component
    ) : null;
  }
}

export default AppRenderer;