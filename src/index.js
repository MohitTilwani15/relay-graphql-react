import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';

import App from './components/App';
import createRelay from './createRelay';

ReactDOM.render(
  <App
    history={createHistory()}
    createRelay={createRelay}
  />,
  document.getElementById('root')
);
