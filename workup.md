                            **NOT react-native-web**
====================================================

TOC ```**Version Date: 2/28/19**```
===================================

 - [REACT + REACT-NATIVE + WEBPACK](#rrnwp)
 - [Migrate to react-native 58.4 from RN 0.21](#migrate)
 

REACT + REACT-NATIVE + WEBPACK <a name=#rrnwp></>
==============================

USE: npm **ci** to install from lock file NOT npm i 

Migrate to react-native 58.4 from RN 0.21<a name=#migrate></>
=========================================
  
  Verified on Android simulator using win7-64 and Android Studio w/ platform-tools 3.3 
  compiling to version 28.0.3  on Nexus_5X_API_28_x86 avd simulator.  

  Need a **way-back machine** ...determined after getting original react version working as web app.
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
  *	[map-basic](./directory-tree.md)
  * [map-detailed](./directory-structure.md)	
  
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

  Needed to add "buffer" to your package.json dependencies. There's some issues w/ recursive dependencies  
  not being resolved with *npm* so you need to resolve them yourself.

Speed-Up Migration
==================
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

Clearing cache and Hast-map "react-native run-android"  and/or  "react-native run-android -- --reset-cache" is also ok just monitor 8080 + (8081 etc) ports with netstat
to keep node.exe and 808? ports available. 

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
      const action = CalculatorActions
   ```
 
  * [Snapshot] and getBaseChildren for granular look at App View tests.
  * Rename files to .spec.js - optional


Typescript
----------
only for react not [rn](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/29265)


###install ts

  ```npm i -D typescript react-native-typescript-transformer @types/react @types/react-native``` 
  
  ```npm install --save-dev @babel/preset-typescript @babel/plugin-proposal-class-properties @babel/plugin-proposal-object-rest-spread```
 
  ```tsc --init --pretty --jsx react```  

###tsconfig

  use: [tsconfig.js](https://github.com/Microsoft/TypeScript-React-Native-Starter/blob/master/ExampleProject/tsconfig.json)

  modify:
   libs:["2015"](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26218)

Jest
----

  // Note: test renderer must be required after react-native.
  import renderer from 'react-test-renderer';
  
WEBPABK & REACT
---------------

###Webpack Setup

  [Forked Trials and Errors](./cleaing.md)

###Big Foul-up

  * Screen.js had debug reference to react-native DOOH!
  * npm webpack-cli webpack webpack-dev-server


refs:

[code]: https://github.com/benoitvallon/react-native-nw-react-calculator
[keyMirror]: https://github.com/STRML/keyMirror/blob/master/index.js
[log]: https://stackoverflow.com/questions/4974568/how-do-i-launch-the-android-emulator-from-the-command-line
[uuid]: https://github.com/facebook/jest/issues/2172
[beforeEach()]: https://stackoverflow.com/questions/39321408/testing-react-flux-store-with-jest-in-es6
[Snapshot]: https://jestjs.io/docs/en/tutorial-react-native.html  
  

WEBPABK & REACT & TYPSCRIPT
===========================

Start with all passing - web and android

Work Flow Issues
----------------

###Acorn malformed

  check it with npm ls [acorn](https://github.com/webpack/webpack/issues/8656)

  *  ```npm -i -D Acorn```
  *  ```npm upgrade Acorn```
  *  ```npm dedup```

###tsconfig challenging

  *  --noEmit false
  *  **--outdir == webppack output == ./dist**   &  ** exclude: [ "node_modules", "./dist"] **
     [ref10](https://github.com/shingoinstitute/describe2ts/commit/465550002a4b726bc6711f2e44cb4d2f69ec307d)
	 [**ref14**](https://stackoverflow.com/questions/42609768/typescript-error-cannot-write-file-because-it-would-overwrite-input-file)
	 
  *  jsx = "preserve"
  
  [ref1](https://stackoverflow.com/questions/49969071/module-build-failed-error-typescript-emitted-no-output-for)
  [ref2](https://github.com/TypeStrong/ts-loader/issues/742) - unexpected token
  [ref8](https://medium.freecodecamp.org/how-to-set-up-a-typescript-project-67b427114884) 
  [**ref9**](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
  [ref12](https://marcobotto.com/blog/compiling-and-bundling-typescript-libraries-with-webpack/)
  [**ref13**](https://github.com/keokilee/react-typescript-boilerplate/issues/158)
  
  
####package.json Scripts(#pckjs)
      
     dev-serve: ```"tsc && webpack-dev-serve --config webpack.config.js  --hot --progress --mode development"```
     
	 build: ```"webpack --config webpack.config.js  --progress --mode production"```
  
    
###@types/node

	outdated most likely [ref11](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/25342)

###@types/babel-preset-react

###Babel.config.js

  *not read by webpack
  
###ts-loader

	[see]

###Avoided  **Awesome-Typescript**  **Parcel**  & **Others**

###babel

[babel-loader-issues-370](https://github.com/babel/babel-loader/issues/370)

Webpack Debug
-------------

  [using-webpack-to-transpile-es6-as-separate-files](https://stackoverflow.com/questions/42670633/using-webpack-to-transpile-es6-as-separate-files)

###Debug Webpack **node-nightly **

  *  **[debugging](https://webpack.js.org/contribute/debugging/)**
  *  [debug-webpack-with-chrome-dev-tools](https://medium.com/webpack/webpack-bits-learn-and-debug-webpack-with-chrome-dev-tools-da1c5b19554)
  *  ```chrome://inspect/```


Jest & Babel
------------

 [install](https://www.npmjs.com/package/ts-jest)

 ###Types

 [ts-jest]( https://stackoverflow.com/questions/53709410/error-in-error-ts2688-cannot-find-type-definition-file-for-jest)
  
  * ```js
    "types": [
      "react",
      "react-native",
	  "jest"
    ]
	```

    [ref3](https://github.com/Microsoft/TypeScript-React-Native-Starter/issues/19)	
    [ref4](https://gist.github.com/c9s/8e2e621d6cfc4e7f8e778d9a592e7f1b) - babel.
    [ref5](https://iamturns.com/typescript-babel/) - babel. 	
    [ref6](https://blog.wax-o.com/2018/05/webpack-loaders-babel-sourcemaps-react-hot-module-reload-typescript-modules-code-splitting-and-lazy-loading-full-tutorial-to-transpile-and-bundle-your-code/)
    babel-HMR
	
###React & Webpack

  start [ref7](https://medium.com/@maxpolski/react-typescript-webpack-jest-93a58c8458e5)
  
###React & TypeScript

   JSX - [type ref1](https://stackoverflow.com/questions/54144095/using-jsx-in-typescript-without-react)
   JSX attr - [type ref2](https://stackoverflow.com/questions/54049871/how-do-i-type-this-as-jsx-attribute-in-typescript) 
   
     *  TSX: Property does not exist on type 'JSX.IntrinsicElements' [#15449](https://github.com/Microsoft/TypeScript/issues/15449)
     *  [typescript-event-handlers](https://rjzaworski.com/2018/10/typescript-event-handlers)
     *  [properly-define-state-in-react-components](https://itnext.io/how-to-properly-define-state-in-react-components-47544eb4c15d)
     *  [do-not-use-anonymous-functions-to-construct-react-functional-components](https://medium.com/@stevemao/do-not-use-anonymous-functions-to-construct-react-functional-components-c5408ec8f4c7)
     *  [effective-use-of-typescript-with-react](https://medium.freecodecamp.org/effective-use-of-typescript-with-react-3a1389b6072a)
     *  **[typescript-react](https://basarat.gitbooks.io/typescript/docs/jsx/react.html)**
	 *  [how-to-correctly-set-initial-state-in-react-with-typescript-without-constructor](https://stackoverflow.com/questions/52748553/how-to-correctly-set-initial-state-in-react-with-typescript-without-constructor)
	 *  **[typescriptlang-handbook](https://www.typescriptlang.org/docs/handbook/jsx.html)**
	 *  **[typescriptlang-handbook](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html)**
	 *  [loading-jsx-file-in-react-component](https://stackoverflow.com/questions/52919195/loading-jsx-file-in-react-component)

  
tsc fix
-------
 
 * reverted to @types/node8.0 to try a fix then
 * fixing tsc errors on globally installed ts
   use ```types = []```, at ln 42 in [tsconfig.js](https://github.com/ionic-team/ionic-cli/issues/3541)



package.json<a name=#pckjs></>
============



  
  
  
  
 
