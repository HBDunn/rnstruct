/**
* https://github.com/facebook/react-native
* @lint-ignore-every XPLATJSCOPYRIGHT1
*/
'use strict';

import Render from './AppRender';

import { Component } from 'react';

export default class App extends Component {
  render () {
    return Render.call(this, this.props, this.state);
  }
}
