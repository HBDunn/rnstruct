'use strict';
import React , {Component} from 'react';
import Base from './ScreenBase';
import Render from './ScreenRender';

export default class Screen extends Base {
  constructor (props) {
    super(props);
  }
  render () {
    return Render.call(this, this.props, this.state);
  }
}
