/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import { QueryRenderer } from 'react-relay';

import router from '../router';
import AppRenderer from './AppRenderer';

class App extends React.Component {
  static childContextTypes = {
    history: PropTypes.instanceOf(Object).isRequired,
    reset: PropTypes.func.isRequired,
  };

  state = {
    query: null,
    variables: null,
    render: () => <AppRenderer ref={this.rendererRef} />,
    relay: this.props.createRelay(),
  };

  childContext = {
    history: this.props.history,
    reset: () => {
      this.setState({ relay: this.props.createRelay() });
      this.props.history.replace(this.props.history.location);
      return new Promise(resolve => {
        this.onRenderComplete = resolve;
      });
    },
  };

  rendererRef = React.createRef();

  getChildContext() {
    return this.childContext;
  }

  componentDidMount() {
    const { history } = this.props;
    this.unlisten = history.listen(this.renderLocation);
    this.renderLocation(history.location);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  renderLocation = location => {
    const { history } = this.props;
    router
      .resolve({
        pathname: location.pathname,
        fetchQuery: this.fetchQuery,
      })
      .then(route => {
        if (route.redirect) {
          history.push(route.redirect);
        } else {
          this.renderRoute(route);
        }
      });
  };

  fetchQuery = (query, variables) => {
    return new Promise((resolve, reject) => {
      this.setState({
        query,
        variables,
        render: ({ error, props }) => {
          if (error) {
            const err = new Error(error.message);
            err.code = error.code;
            reject(err);
          } else if (props !== null) {
            resolve(props);
          }
          return <AppRenderer ref={this.rendererRef} />;
        },
      });
    });
  };

  renderRoute = route => {
    this.rendererRef.current.renderRoute(route, this.onRenderComplete);
  };

  render() {
    const { relay, query, variables, render } = this.state;

    return (
      <div className="container">
        <QueryRenderer
          environment={relay}
          query={query}
          variables={variables || {}}
          render={render}
        />
      </div>
    );
  }
}

export default App;