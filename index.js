'use strict';

import App from './src/common/components/App';
import React from 'react';
import ReactDOM from 'react-dom';
//import { Router, Route, hashHistory } from 'react-router';

// CSS
require('./src/styles/normalize.css');
require('./src/styles/main.css');

ReactDOM.render(<App />, document.getElementById('root'));

/*var root = document.getElementById('root');

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App} />
  </Router>
), root);*/

//module.hot.accept();
