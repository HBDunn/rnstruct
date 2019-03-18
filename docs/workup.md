<a name=rrnwp/>REACT 16.6.3 & REACT-NATIVE 58.4 & WEBPACK 4.29.6
===================================================================

<h2 align='center'>(ONE CODE BASE)</h2>

 **NOT react-native-web**

###**NPM CI**
 [Stop upgrading](https://docs.npmjs.com/cli/ci.html) on install that re-breaks a working code-base.

 ```**Use npm ci**```

<a name=toc>TOC **Version Date: 3/15/19**
=========================================
  [Speed-Up Migration](./cleaning.md)

  1.0 [REACT + REACT-NATIVE + WEBPACK](#rrnwp)

2.0 [Migrating to react-native 58.4 from RN 0.21](#migrate)
  - [2.1.a. Directory Structure](#DS)
    - [b. Fixes](#fixes)
    - [c. ES6](#es6)
    - [d. Events](#events)
    - [e. uniqid](#uq)
    - [f. KeyMirror](#km)
    - [g. Buffer](#buff)

3.0 [Typescript](#typs)
  - [3.1.a. Install TS](#its)
    - [b. tsconfig](#tscon)

4.0 [WEBPACK & REACT & BABEL](#wrb)
  - [4.1.a. Webpack Setup](#ws)
    - [b. Webpack-Config-Help?](#wch)
    - [c. MiniCssExtractPlugin](#mincss)
    - [d. My Big Foul-up](#mfu)
    - [e. Webpack-Debug](#debug)
    - [f. Target](#target)
    - [g. Misc](#misc)		

5.0 [WEBPABK & REACT & BABEL & TYPSCRIPT](#wrbt)
  - [5.1.a. Work Flow Issues](#issues)
    - [b. Acorn malformed](#acorn)
    - [c. tsconfig Challenging](#tsc)
    - [d. package.json scripts](#pckjscrpt )
    - [e. Babel.config.js](#babc)
    - [f. Types](#types)
    - [g. @types/node](#node)
    - [h. @types/babel-preset-react](#bpr)
    - [i. ts-loader](#tsload)
    - [j. Avoided](#avoid)
    - [k. babel](#bab)
  - [5.2.a React & TypeScript](#rts)	
  
6.0 [JEST TESTS](#jtests)  
  - [6.1.a Jest js](#jestjs)
    - [b. Tests](#tests)
    - [c. Jest ts](#jestjs)
    - [d. Jest & Babel](#jb)
    
7.0 [package.json](#pckjs)

8.0 [tsconfig.json](#tscnfgjs)

9.0 [webpack.config.js](#webpk)

 [Final Draft ScreenShots]() 

| &nbsp; &nbsp; &nbsp; |   Webpage&nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; Android &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; |
|----------------------:|:--------------------------:|:--------------:|:-------------------------------------------------------:|:----------------------:|
| &nbsp; &nbsp; &nbsp; | ![](screencapture-localhost-8083-2019-03-14-22_12_22s.png) | &nbsp; &nbsp; &nbsp; | ![](Screenshot_1552620453s.png) | &nbsp; &nbsp; &nbsp; |
| &nbsp; &nbsp; &nbsp; | ![](screencapture-localhost-8083-2019-03-14-22_36_59s.png) | &nbsp; &nbsp; &nbsp; | ![](Screenshot_1552624408s.png) | &nbsp; &nbsp; &nbsp; |


  USE: npm **ci** to install from lock file NOT npm i 

**[TOC](#toc)**
	
<a name=migrate/>Migrate to react-native 58.4 from RN 0.21
----------------------------------------------------------
  
  A majority of the website references are listed. Read with care as many are outdated or 
  using react/react-native/typescript/webpack **older versions**. 
  
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

<a name=DS/>Directory Structure
-------------------------------------

  * Moved all source into /src dir.
  * /Android/build.gradle changed entry from index.js to:  
	
	```js
	project.ext.react = [
	  entryFile: "index.android.js"
	]
	```
  *	[map-basic](./directory-tree.md)
  * [map-detailed](./directory-structure.md)	

**[TOC](#toc)**  

<a name=fixes/>Fixes 
--------------------

TLDR: In ```android/``` directory ```react-native run-android -- --reset-cache```. 

The direct command is using gradlew in the android/ directory:

  * Dev
    
	  ```./gradlew clean```
	
	  ```./gradlew installDebug```
  
   * Prod
   
###<a name=es6/>ES6

  * imports

	```js
	import React from 'react';
	```

	```jsx
	import * as React from 'react';
	```
  
###<a name=events/>Events

  * ```this.on```  in  EventEmitter addChangeListener is undefined in prototype  
	as this is not constructed EvenEmitter no reference to this in prototype
  * Replaced EventEmitter with [EventEmitter3](https://stackoverflow.com/questions/36774540/eventemitter-and-subscriber-es6-syntax-with-react-native)

	```js
	   import EventEmitter from 'eventemitter3';
	``` 
   
###<a name=uq/>uniqid

  * Use [uuid](https://www.npmjs.com/package/react-native-uuid)
  
  ```js
	 import uuid from 'react-native-uuid';  
  ```		
  
  * In modules replace 'uniqid' with 'uuid';
	
###<a name=km/>KeyMirror

  * Deprecated in RN.  
  * Hi-Jacked [keyMirror] into mkdir /utils.

###<a name=buff/>Buffer

  Needed to add "buffer" to your package.json dependencies. There's some issues w/ recursive dependencies  
  not being resolved with *npm* so you need to resolve them yourself.

**[TOC](#toc)**


<a name=typs/>Typescript
------------------------
Only for react not [react-native](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/29265)

<a name=its/>###Install TS

  ```npm i -D typescript react-native-typescript-transformer @types/react @types/react-native``` 
  
  ```npm install --save-dev @babel/preset-typescript @babel/plugin-proposal-class-properties```

  ```npm i -D @babel/plugin-proposal-object-rest-spread```
 
  ```tsc --init --pretty --jsx react```  
  
  - ** npm i = install; -D = -save-dev**.

####<a name=tscon/>tsconfig

  use: [tsconfig.js](https://github.com/Microsoft/TypeScript-React-Native-Starter/blob/master/ExampleProject/tsconfig.json)

  modify:
  
  libs:["2015"](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26218)

<a name=wrb/>WEBPACK & REACT & BABEL
====================================

<a name=ws/>Webpack Setup
-------------------------
  
  - ```npm webpack-cli webpack webpack-dev-server```
  
  - start [ref7](https://medium.com/@maxpolski/react-typescript-webpack-jest-93a58c8458e5)
  
  [Forked Trials and Errors](./cleaing.md)

<a name=wch/>Webpack-Config-Help?
----------------------------------

  [Saving Throw SO Ref](https://webpack.js.org/configuration/resolve/#resolve-alias)


<a name=mincss/>MiniCssExtractPlugin
------------------------------------

[mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin)  
  
  
<a name=mfu/>My Big Foul-up
----------------------------

  * Screen.js had debug reference to react-native DOOH!

<a name=debug/>Webpack-Debug
----------------------------

[using-webpack-to-transpile-es6-as-separate-files](https://stackoverflow.com/questions/42670633/using-webpack-to-transpile-es6-as-separate-files)

###<a name=target/>Target

 *Error - Client on node: Uncaught ReferenceError: require is not defined
  target: ['web'](https://stackoverflow.com/questions/19059580/client-on-node-uncaught-referenceerror-require-is-not-defined)


###<a name=misc/>Misc
	
 * fails react-native "Can not resolve ... in react-native/react-native-implementations.js
   check that web/electron components are NOT referencing react-native
 * Plugin/Preset files are not allowed to export objects, only functions [#8707](https://github.com/babel/babel/issues/8707)
 * Unable to resolve module `schedule/tracking` [#21150](https://github.com/facebook/react-native/issues/21150)
 * [index.android.js vs index.js](https://stackoverflow.com/questions/44446523/unable-to-load-script-from-assets-index-android-bundle-on-windows/44476757#44476757)
 
[code]: https://github.com/benoitvallon/react-native-nw-react-calculator
[keyMirror]: https://github.com/STRML/keyMirror/blob/master/index.js
[log]: https://stackoverflow.com/questions/4974568/how-do-i-launch-the-android-emulator-from-the-command-line
[uuid]: https://github.com/facebook/jest/issues/2172
[beforeEach()]: https://stackoverflow.com/questions/39321408/testing-react-flux-store-with-jest-in-es6
[Snapshot]: https://jestjs.io/docs/en/tutorial-react-native.html  

<a name=wrbt/>WEBPABK & REACT & BABEL & TYPSCRIPT
=================================================

**Start with all passing - web and android**

<a name=issues/>Work Flow Issues
--------------------------------

###<a name=acorn/>Acorn malformed

  Check [Acorn](https://github.com/webpack/webpack/issues/8656)
  with ```npm ls acorn ```

  *  ```npm -i -D Acorn```
  *  ```npm upgrade Acorn```
  *  ```npm dedup```

###<a name=tsc/>tsconfig Challenging

  * --noEmit false
  * **--outdir** is webpack **output = ./dist**
  * **exclude: [ "node_modules", "./dist"]**
    
	[ref10](https://github.com/shingoinstitute/describe2ts/commit/465550002a4b726bc6711f2e44cb4d2f69ec307d), 
	[**ref14**](https://stackoverflow.com/questions/42609768/typescript-error-cannot-write-file-because-it-would-overwrite-input-file)
	 
  * jsx = "preserve"
  
      [ref1](https://stackoverflow.com/questions/49969071/module-build-failed-error-typescript-emitted-no-output-for), 
	  [ref2](https://github.com/TypeStrong/ts-loader/issues/742) - *unexpected token*, 
	  [ref8](https://medium.freecodecamp.org/how-to-set-up-a-typescript-project-67b427114884), 
	  [**ref9**](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html), 
	  [ref12](https://marcobotto.com/blog/compiling-and-bundling-typescript-libraries-with-webpack/), 
	  [**ref13**](https://github.com/keokilee/react-typescript-boilerplate/issues/158)
  
  
####package.json Scripts<a name=pckjscrpt /></>
      
  * dev-serve:

    ```json
	"tsc && webpack-dev-serve --config webpack.config.js  --hot --progress --mode development"
	```
     
  * build:web

    ```json
	"webpack --config webpack.config.js  --progress --mode production"
	```
  
###<a name=babc/>Babel.config.js

  * **Not read by webpack** - as far as I can tell.
 
###<a name=types/>Types

 * Reverted to @types/node8.0 to try a fix then
 * Ended up at @types/node10.11
 
 [ts-jest]( https://stackoverflow.com/questions/53709410/error-in-error-ts2688-cannot-find-type-definition-file-for-jest)
  
  * tsconfig
	```json
	"types": [	
		"react",
		"react-native",
		"jest"
	  ]
	```

  [ref3](https://github.com/Microsoft/TypeScript-React-Native-Starter/issues/19), 
  [ref4](https://gist.github.com/c9s/8e2e621d6cfc4e7f8e778d9a592e7f1b) - babel. ,
  [ref5](https://iamturns.com/typescript-babel/) - babel., 
  [ref6](https://blog.wax-o.com/2018/05/webpack-loaders-babel-sourcemaps-react-hot-module-reload-typescript-modules-code-splitting-and-lazy-loading-full-tutorial-to-transpile-and-bundle-your-code/) 
   babel-HMR
 
###<a name=node/>@types/node

  - Outdated(most likely) [ref11](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/25342)

###<a name=bpr/>@types/babel-preset-react
 
###<a name=tsload/>ts-loader

###<a name=avoid/>Avoided

  - **Awesome-Typescript**
  - **Parcel**
  - & **Others**

###<a name=bab/>babel

[babel-loader-issues-370](https://github.com/babel/babel-loader/issues/370)

<a name=rts/>React & TypeScript
------------------

   * JSX - [type ref1](https://stackoverflow.com/questions/54144095/using-jsx-in-typescript-without-react)
   * JSX attr - [type ref2](https://stackoverflow.com/questions/54049871/how-do-i-type-this-as-jsx-attribute-in-typescript) 
   
     *  [TSX: Property does not exist on type 'JSX.IntrinsicElements' #15449](https://github.com/Microsoft/TypeScript/issues/15449)
     *  [typescript-event-handlers](https://rjzaworski.com/2018/10/typescript-event-handlers)
     *  [properly-define-state-in-react-components](https://itnext.io/how-to-properly-define-state-in-react-components-47544eb4c15d)
     *  [do-not-use-anonymous-functions-to-construct-react-functional-components](https://medium.com/@stevemao/do-not-use-anonymous-functions-to-construct-react-functional-components-c5408ec8f4c7)
     *  [effective-use-of-typescript-with-react](https://medium.freecodecamp.org/effective-use-of-typescript-with-react-3a1389b6072a)
     *  **[typescript-react](https://basarat.gitbooks.io/typescript/docs/jsx/react.html)**
	 *  [how-to-correctly-set-initial-state-in-react-with-typescript-without-constructor](https://stackoverflow.com/questions/52748553/how-to-correctly-set-initial-state-in-react-with-typescript-without-constructor)
	 *  **[typescriptlang-handbook](https://www.typescriptlang.org/docs/handbook/jsx.html)**
	 *  **[typescriptlang-handbook](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html)**
	 *  [loading-jsx-file-in-react-component](https://stackoverflow.com/questions/52919195/loading-jsx-file-in-react-component)

<a name=jtests/>JEST TESTS
==========================

<a name=jestjs/>Jest js
-----------------------
  npm i -D jest
  /Note: test renderer must be required after react-native.
  
```js
import renderer from 'react-test-renderer';
```

<a name=tests/>Tests
--------------------

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

<a name=jestjs/>Jest ts
-----------------------

  [ts-jest](https://www.npmjs.com/package/ts-jest)

  ```npm i -D babel-jest ts-jest```	
  
  [ref15 imports](https://stackoverflow.com/questions/52173815/ts-jest-does-not-recognize-es6-imports)
  
  * package.json
    
	```json
	  "jest": {
	  "transform": {
	    "^.+\\.jsx?$": "babel-jest",
	    "^.+\\.tsx?$": "ts-jest"
	  },
	  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
	  "moduleFileExtensions": [
		"ts",
		"tsx",
		"js",
		"jsx",
		"json",
		"node"
		]
	  }
	```
	
<a name=jb/>Jest & Babel
------------------------
 [Install ts-jest](https://www.npmjs.com/package/ts-jest)

package.json<a name=pckjs></>
============================= 
  * [package.json](./packageJSON.md) 
  
tsconfig.json<a name=tscnfgjs></>
=================================
  * [tsconfig.json](./tsconfig.md) 
  
webpack.config.js<a name=webpk></>
==================================
  * [webpack.config.js](./webpackconfig.md)  
