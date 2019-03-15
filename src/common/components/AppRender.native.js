'use strict';

import Screen from './Screen';
import Formulae from './Formulae';
import Keyboard from './Keyboard';
import React from 'react';
import {StyleSheet, View, Platform} from 'react-native';

export default function () {
  return (
    <View style={styles.container}>
      <View style={styles.screen} >
        <Screen />
      </View>
      <View style={styles.formulae}>
        <Formulae />
      </View>
      <View style={styles.keyboard}>
        <Keyboard />
      </View>
    </View>
  );
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  screen: {
    flex: 3,
    flexDirection: 'row',
    alignItems: Platform.OS === 'android' ? 'center' : 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: '#68cef2',
	color:'#190d08',
    padding: 18
  },
  formulae: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#f0f0f0',
	borderColor:'#ffe387',
	borderWidth:1,
    padding: 20
  },
  keyboard: {
    height: 420
  }
});
