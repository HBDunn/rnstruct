'use strict';

import Base from './ScreenBase';
import Render from './ScreenRender';
import React , {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default class Screen extends Base {
  constructor (props) {
    super(props);
  }
  render () {
    return Render.call(this, this.props, this.state);
  }
}
