/* @flow */

import React from 'react';
import PropTypes from 'prop-types';

class ErrorPage extends React.Component {
  static contextTypes = {
    history: PropTypes.instanceOf(Object).isRequired,
  };

  componentDidMount() {
    document.title =
      this.props.error && this.props.error.status === 404
        ? 'Page Not Found'
        : 'Error';
  }

  goBack = (event) => {
    event.preventDefault();
    this.context.history.goBack();
  };

  render() {
    if (this.props.error) {
      console.error(this.props.error); // eslint-disable-line no-console
    }

    const [code, title] =
      this.props.error && this.props.error.status === 404
        ? ['404', 'Page not found']
        : ['Error', 'Oops, something went wrong'];

    return (
      <div>
        Error {code} {title}
      </div>
    );
  }
}

export default ErrorPage;