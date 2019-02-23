

Migrate to react-native 58.4 from rn 0.21
=========================================

  **Version Date: 2/21/19**
  
  Verified on Android simulator using win7-64 and Android Studio w/ platform-tools 3.3 
  compiling to version 28.0.3  on Nexus_5X_API_28_x86 avd simulator.  

  Need a *way-back machine* ...determined after getting original react version working as web app.
  Easier to start over with
  
```js
	npm i react-native
	npm react-native init "rnstruct"
``` 

  Original [code] from Benoit Vallon.  
  Modified and adapted to react-native@**58.4** and react@**16.6.3** by HDunn <hdunn@peswim.com>.  
  MIT License.

Structure
---------

  * Moved all source into /src dir.
  * /Android/build.gradle changed entry from index.js to:  
	
	```js
	project.ext.react = [
	  entryFile: "index.android.js"
	]
	```
  
Fixes 
-----

TLDR: ```npm start```  then in separate terminal from root dir ```react-native run-android```. 

###ES6

```js
   import React from 'react';
```
  
###Events

  * ```this.on```  in  EventEmitter addChangeListener is undefined in prototype  
	as this is not constructed EvenEmitter no reference to this in prototype
  * Replaced EventEmitter with [EventEmitter3](https://stackoverflow.com/questions/36774540/eventemitter-and-subscriber-es6-syntax-with-react-native)

	```js
	   import EventEmitter from 'eventemitter3';
	``` 
   
###uniqid

  Use [uuid](https://www.npmjs.com/package/react-native-uuid)
  
  ```js
	 import uuid from 'react-native-uuid';  
  ```		
   In modules replace 'uniqid' with 'uuid';
	
###KeyMirror

  Deprecated in RN.  
  Hi-Jacked [keyMirror] into mkdir /utils.

###Buffer

  You need to add "buffer" to your package.json dependencies. There's some issues w/ recursive dependencies  
  not being resolved with *npm* so you need to resolve them yourself.

Speed-Up Development
====================
cmd-line emulator 
-----------------

  * Use adb [log]
  * start in bash shell  ``` $ adb logcat *:S ReactNativeJS:V ReactNative:V```
  * clear log bash shell ``` $ adb log -c```

Avoid "Red-Blocks" on Android
-----------------------------

In general found that using ```npm start``` in a separate terminal did not fail nearly as much when only running ```react-native run-android```.  Apparently
there is a different start-up used in the react-native scripts, which makes it hard to change imports and dependencies without killing all terminals and starting from  
scratch. 

###checking on server state - requires elevation

  * windows
    ```netstat -bon | find "node.exe"```  
    ```taskkill /f /im "node.exe"``` then check no port 8081 ```netstat -bon | find "8081"```

  * tasklist - with | find
	
  * bash
    ```netstat -bon | grep -C3 "node.exe"```
	```taskkill //f //im "node.exe"``` then check no port 8081 ```netstat -bon | find "8081"```
	
  * tasklist - with a | grep 
  * watch adb.exe too  
  
###avd
 
  * make a shell script  
    startemu28.sh
	
	```
	#!/usr/bin/bash 
	echo 'available avds'
	/c/Users/YOUR_HOME_DIR/AppData/local/Android/sdk/emulator/emulator -list-avds
	echo 'starting Nexus_5X_API_28_x86 - edit startemu28.sh to change'
	/c/Users/YOUR_HOME_DIR/AppData/local/Android/sdk/emulator/emulator -avd Nexus_5X_API_28_x86
	# comment options I have build with Android Studio using Avd Manager
	#Nexus_5X_API_27
	#Nexus_5X_API_28_x86
	```

Tests
=====

  * Remove Phantom.shim.js
  * Mock [uuid]
	```js
	  jest.mock("uuid/v4", () => {
		let value = 0;
		return () => value++;
	  });
	```  

  * Fix imports - remove requires
  * Set uuid's sequentially from 0
  * Match AppDispatcher:register to actual Dispatcher:register function call and reset each time in [beforeEach()].
  * Rename  CalculatorActions to action after import.
  
   ```js
      const action = CaclulatorActions
   ```
 
  * [Snapshot] and getBaseChildren for granular look at App View tests.
  * Rename files to .spec.js - optional


Typescript
==========
only for react not rn
https://github.com/DefinitelyTyped/DefinitelyTyped/issues/29265
Start
-----

```npm i -D typescript react-native-typescript-transformer @types/react @types/react-native``` 
npm install --save-dev @babel/preset-typescript @babel/plugin-proposal-class-properties @babel/plugin-proposal-object-rest-spread
 

```tsc --init --pretty --jsx react```  

###tsconfig

use:
https://github.com/Microsoft/TypeScript-React-Native-Starter/blob/master/ExampleProject/tsconfig.json

modify:
libs:["2015"]
https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26218

Jest
====

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
  

WEB-REACT
=========

Next level
 
webpack
-------  
npm webpack-cli webpack webpack-dev-server

###fails react-native
filtering test with regex ```/^(?!.*\..*\.(js.?)$)(.*\.js.?)$ /```
skips .native.js(x) and .android.js(x), but webpack still fails on compile of react-native

try - fixing compile


refs:

[code]: https://github.com/benoitvallon/react-native-nw-react-calculator
[keyMirror]: https://github.com/STRML/keyMirror/blob/master/index.js
[log]: https://stackoverflow.com/questions/4974568/how-do-i-launch-the-android-emulator-from-the-command-line
[uuid]: https://github.com/facebook/jest/issues/2172
[beforeEach()]: https://stackoverflow.com/questions/39321408/testing-react-flux-store-with-jest-in-es6
[Snapshot]: https://jestjs.io/docs/en/tutorial-react-native.html