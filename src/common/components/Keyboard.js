'use strict';
import { Component } from 'react';
import Render from './KeyboardRender';

export default class Keyboard extends Component {
  render () {
    return Render.call(this, this.props, this.state);
  }
}
