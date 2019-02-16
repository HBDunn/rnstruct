/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
'use strict';

import {AppRegistry} from 'react-native';
import App from './src/common/components/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
