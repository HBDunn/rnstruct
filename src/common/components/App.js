/**
* https://github.com/facebook/react-native
* @lint-ignore-every XPLATJSCOPYRIGHT1
*/
'use strict';
import { Component } from 'react';
import Render from './AppRender';



export default class App extends Component {
  render () {
    return Render.call(this, this.props, this.state);
  }
}
