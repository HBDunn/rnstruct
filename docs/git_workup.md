  - [<a name=rrnwp/>REACT 16.6.3 & REACT-NATIVE 58.4 & WEBPACK
    4.29.6](#react-16.6.3-react-native-58.4-webpack-4.29.6)
  - [<a name=toc>TOC **Version Date: 3/15/19**](#toc-version-date-31519)
      - [<a name=migrate/>Migrate to react-native 58.4 from RN
        0.21](#migrate-to-react-native-58.4-from-rn-0.21)
      - [<a name=DS/>Directory Structure](#directory-structure)
      - [<a name=fixes/>Fixes](#fixes)
      - [Typescript](#typescript)
  - [WEBPACK & REACT & BABEL](#webpack-react-babel)
      - [Webpack Setup](#webpack-setup)
      - [Webpack-Config-Help?](#webpack-config-help)
      - [MiniCssExtractPlugin](#minicssextractplugin)
      - [My Big Foul-up](#my-big-foul-up)
      - [Webpack-Debug](#webpack-debug)
  - [WEBPABK & REACT & BABEL &
    TYPSCRIPT](#webpabk-react-babel-typscript)
      - [Work Flow Issues](#work-flow-issues)
      - [React & TypeScript](#react-typescript)
  - [JEST TESTS](#jest-tests)
      - [Jest js](#jest-js)
      - [Tests](#tests)
      - [Jest ts](#jest-ts)
      - [<a name=jb/>Jest & Babel](#jest-babel)
  - [package.json<a name=pckjs>\</\>](#package.json)
  - [tsconfig.json<a name=tscnfgjs>\</\>](#tsconfig.json)
  - [webpack.config.js<a name=webpk>\</\>](#webpack.config.js)

# <a name=rrnwp/>REACT 16.6.3 & REACT-NATIVE 58.4 & WEBPACK 4.29.6

<h2 align="center">

(ONE CODE BASE)

</h2>

**NOT react-native-web**

\#\#\#**NPM CI** [Stop upgrading](https://docs.npmjs.com/cli/ci.html) on
install that re-breaks a working code-base.

`**Use npm ci**`

# <a name=toc>TOC **Version Date: 3/15/19**

[Speed-Up Migration](./cleaning.md)

1.  [REACT + REACT-NATIVE + WEBPACK](#rrnwp)
2.  [Migrating to react-native 58.4 from RN 0.21](#migrate) - [2.a
    Directory Structure](#DS) - [2.b Fixes](#fixes) - [2.c ES6](#es6) -
    [2.d Events](#events) - [2.e Uniqid](#uq) - [2.f KeyMirror](#km) -
    [2.g Buffer](#buff) - \[2.h

[Final Draft ScreenShots]()

|

<pre>           </pre>

| Webpage

<pre>      </pre>

|

<pre>   </pre>

| Android

<pre>

<pre>

|

<pre>         </pre>

| |:———————-:|:————————–:|:————–:|:——————————————————-:———————-: |

<pre>           </pre>

| ![rnstruct-web](screencapture-localhost-8083-2019-03-14-22_12_22s.png
"rnstruct-web") |

<pre>       </pre>

| \&nbsp ![rnstruct-android](Screenshot_1552620453s.png
"rnstruct-android") | | | | |

<pre>           </pre>

|
![rnstruct-web-action](screencapture-localhost-8083-2019-03-14-22_36_59s.png
"rnstruct-web-ation") |

<pre>        </pre>

| \&nbsp ![rnstruct-android-action](Screenshot_1552624408s.png
"rnstruct-android-action")

    USE: npm **ci** to install from lock file NOT npm i 

**[TOC](#toc)**

## <a name=migrate/>Migrate to react-native 58.4 from RN 0.21

A majority of the website references are listed. Read with care as many
are outdated or using react/react-native/typescript/webpack **older
versions**.

Verified on Android simulator using win7-64 and Android Studio w/
platform-tools 3.3 compiling to version 28.0.3 on
Nexus\_5X\_API\_28\_x86 avd simulator.

Need a **way-back machine** …determined after getting original react
version working as web app. Easier to start over with

``` js
    npm i react-native
    npm react-native init "rnstruct"
```

Original
[code](https://github.com/benoitvallon/react-native-nw-react-calculator)
from Benoit Vallon.  
Modified and adapted to react-native@**58.4** and react@**16.6.3** by
HDunn <hdunn@peswim.com>.  
MIT License.

## <a name=DS/>Directory Structure

  - Moved all source into /src dir.

  - /Android/build.gradle changed entry from index.js to:
    
    ``` js
    project.ext.react = [
      entryFile: "index.android.js"
    ]
    ```

  - [map-basic](./directory-tree.md)

  - [map-detailed](./directory-structure.md)

**[TOC](#toc)**

## <a name=fixes/>Fixes

TLDR: In `android/` directory `react-native run-android --
--reset-cache`.

The direct command is using gradlew in the android/ directory:

  - Dev
    
    `./gradlew clean`
    
    `./gradlew installDebug`

  - Prod

\#\#\#<a name=es6/>ES6

  - imports
    
    ``` js
    import React from 'react';
    ```
    
    ``` jsx
    import * as React from 'react';
    ```

\#\#\#<a name=events/>Events

  - `this.on` in EventEmitter addChangeListener is undefined in
    prototype  
    as this is not constructed EvenEmitter no reference to this in
    prototype

  - Replaced EventEmitter with
    [EventEmitter3](https://stackoverflow.com/questions/36774540/eventemitter-and-subscriber-es6-syntax-with-react-native)
    
    ``` js
       import EventEmitter from 'eventemitter3';
    ```

\#\#\#<a name=uq/>uniqid

  - Use [uuid](https://www.npmjs.com/package/react-native-uuid)

<!-- end list -->

``` js
   import uuid from 'react-native-uuid';  
```

  - In modules replace ‘uniqid’ with ‘uuid’;

\#\#\#<a name=km/>KeyMirror

  - Deprecated in RN.  
  - Hi-Jacked
    [keyMirror](https://github.com/STRML/keyMirror/blob/master/index.js)
    into mkdir /utils.

\#\#\#<a name=buff/>Buffer

Needed to add “buffer” to your package.json dependencies. There’s some
issues w/ recursive dependencies  
not being resolved with *npm* so you need to resolve them yourself.

**[TOC](#toc)**

## Typescript

Only for react not
[react-native](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/29265)

\#\#\#Install TS

`npm i -D typescript react-native-typescript-transformer @types/react
@types/react-native`

`npm install --save-dev @babel/preset-typescript
@babel/plugin-proposal-class-properties`

`npm i -D @babel/plugin-proposal-object-rest-spread`

`tsc --init --pretty --jsx react`

  - \*\* npm i = install; -D = -save-dev\*\*.

\#\#\#\#tsconfig

use:
[tsconfig.js](https://github.com/Microsoft/TypeScript-React-Native-Starter/blob/master/ExampleProject/tsconfig.json)

modify:

libs:[“2015”](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26218)

# WEBPACK & REACT & BABEL

## Webpack Setup

  - `npm webpack-cli webpack webpack-dev-server`

  - start
    [ref7](https://medium.com/@maxpolski/react-typescript-webpack-jest-93a58c8458e5)

[Forked Trials and Errors](./cleaing.md)

## Webpack-Config-Help?

[Saving Throw SO
Ref](https://webpack.js.org/configuration/resolve/#resolve-alias)

## MiniCssExtractPlugin

[mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin)

## My Big Foul-up

  - Screen.js had debug reference to react-native DOOH\!

## Webpack-Debug

[using-webpack-to-transpile-es6-as-separate-files](https://stackoverflow.com/questions/42670633/using-webpack-to-transpile-es6-as-separate-files)

\#\#\#Target

\*Error - Client on node: Uncaught ReferenceError: require is not
defined target:
[‘web’](https://stackoverflow.com/questions/19059580/client-on-node-uncaught-referenceerror-require-is-not-defined)

\#\#\#Misc

  - fails react-native "Can not resolve … in
    react-native/react-native-implementations.js check that web/electron
    components are NOT referencing react-native
  - Plugin/Preset files are not allowed to export objects, only
    functions [\#8707](https://github.com/babel/babel/issues/8707)
  - Unable to resolve module `schedule/tracking`
    [\#21150](https://github.com/facebook/react-native/issues/21150)
  - [index.android.js vs
    index.js](https://stackoverflow.com/questions/44446523/unable-to-load-script-from-assets-index-android-bundle-on-windows/44476757#44476757)

# WEBPABK & REACT & BABEL & TYPSCRIPT

**Start with all passing - web and android**

## Work Flow Issues

\#\#\#Acorn malformed

Check [Acorn](https://github.com/webpack/webpack/issues/8656) with `npm
ls acorn`

  - `npm -i -D Acorn`
  - `npm upgrade Acorn`
  - `npm dedup`

\#\#\#tsconfig Challenging

  - –noEmit false

  - **–outdir** is webpack **output = ./dist**

  - **exclude: \[ “node\_modules”, “./dist”\]**
    
    [ref10](https://github.com/shingoinstitute/describe2ts/commit/465550002a4b726bc6711f2e44cb4d2f69ec307d),
    [**ref14**](https://stackoverflow.com/questions/42609768/typescript-error-cannot-write-file-because-it-would-overwrite-input-file)

  - jsx = “preserve”
    
    [ref1](https://stackoverflow.com/questions/49969071/module-build-failed-error-typescript-emitted-no-output-for),
    [ref2](https://github.com/TypeStrong/ts-loader/issues/742) -
    *unexpected token*,
    [ref8](https://medium.freecodecamp.org/how-to-set-up-a-typescript-project-67b427114884),
    [**ref9**](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html),
    [ref12](https://marcobotto.com/blog/compiling-and-bundling-typescript-libraries-with-webpack/),
    [**ref13**](https://github.com/keokilee/react-typescript-boilerplate/issues/158)

\#\#\#\#package.json Scripts<a name=pckjscrpt />\</\>

  - dev-serve:
    
    ``` json
    "tsc && webpack-dev-serve --config webpack.config.js  --hot --progress --mode development"
    ```

  - build:web
    
    ``` json
    "webpack --config webpack.config.js  --progress --mode production"
    ```

\#\#\#Babel.config.js

  - **Not read by webpack** - as far as I can tell.

\#\#\#Types

  - Reverted to @types/node8.0 to try a fix then
  - Ended up at @types/node10.11

[ts-jest](https://stackoverflow.com/questions/53709410/error-in-error-ts2688-cannot-find-type-definition-file-for-jest)

  - tsconfig
    
    ``` json
    "types": [  
        "react",
        "react-native",
        "jest"
      ]
    ```

[ref3](https://github.com/Microsoft/TypeScript-React-Native-Starter/issues/19),
[ref4](https://gist.github.com/c9s/8e2e621d6cfc4e7f8e778d9a592e7f1b) -
babel. , [ref5](https://iamturns.com/typescript-babel/) - babel.,
[ref6](https://blog.wax-o.com/2018/05/webpack-loaders-babel-sourcemaps-react-hot-module-reload-typescript-modules-code-splitting-and-lazy-loading-full-tutorial-to-transpile-and-bundle-your-code/)
babel-HMR

\#\#\#@types/node

  - Outdated(most likely)
    [ref11](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/25342)

\#\#\#@types/babel-preset-react

\#\#\#ts-loader

\#\#\#Avoided

  - **Awesome-Typescript**
  - **Parcel**
  - & **Others**

\#\#\#babel

[babel-loader-issues-370](https://github.com/babel/babel-loader/issues/370)

## React & TypeScript

  - JSX - [type
    ref1](https://stackoverflow.com/questions/54144095/using-jsx-in-typescript-without-react)

  - JSX attr - [type
    ref2](https://stackoverflow.com/questions/54049871/how-do-i-type-this-as-jsx-attribute-in-typescript)
    
      - [TSX: Property does not exist on type ‘JSX.IntrinsicElements’
        \#15449](https://github.com/Microsoft/TypeScript/issues/15449)
      - [typescript-event-handlers](https://rjzaworski.com/2018/10/typescript-event-handlers)
      - [properly-define-state-in-react-components](https://itnext.io/how-to-properly-define-state-in-react-components-47544eb4c15d)
      - [do-not-use-anonymous-functions-to-construct-react-functional-components](https://medium.com/@stevemao/do-not-use-anonymous-functions-to-construct-react-functional-components-c5408ec8f4c7)
      - [effective-use-of-typescript-with-react](https://medium.freecodecamp.org/effective-use-of-typescript-with-react-3a1389b6072a)
      - **[typescript-react](https://basarat.gitbooks.io/typescript/docs/jsx/react.html)**
      - [how-to-correctly-set-initial-state-in-react-with-typescript-without-constructor](https://stackoverflow.com/questions/52748553/how-to-correctly-set-initial-state-in-react-with-typescript-without-constructor)
      - **[typescriptlang-handbook](https://www.typescriptlang.org/docs/handbook/jsx.html)**
      - **[typescriptlang-handbook](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html)**
      - [loading-jsx-file-in-react-component](https://stackoverflow.com/questions/52919195/loading-jsx-file-in-react-component)

# JEST TESTS

## Jest js

npm i -D jest /Note: test renderer must be required after react-native.

``` js
import renderer from 'react-test-renderer';
```

## Tests

  - Remove Phantom.shim.js

  - Mock [uuid](https://github.com/facebook/jest/issues/2172)
    
    ``` js
      jest.mock("uuid/v4", () => {
        let value = 0;
        return () => value++;
      });
    ```

  - Fix imports - remove requires

  - Set uuid’s sequentially from 0

  - Match AppDispatcher:register to actual Dispatcher:register function
    call and reset each time in
    [beforeEach()](https://stackoverflow.com/questions/39321408/testing-react-flux-store-with-jest-in-es6).

  - Rename CalculatorActions to action after import.
    
    ``` js
      const action = CalculatorActions
    ```

  - [Snapshot](https://jestjs.io/docs/en/tutorial-react-native.html) and
    getBaseChildren for granular look at App View tests.

  - Rename files to .spec.js - optional

## Jest ts

[ts-jest](https://www.npmjs.com/package/ts-jest)

`npm i -D babel-jest ts-jest`

[ref15
imports](https://stackoverflow.com/questions/52173815/ts-jest-does-not-recognize-es6-imports)

  - package.json
    
    ``` json
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

## <a name=jb/>Jest & Babel

[Install ts-jest](https://www.npmjs.com/package/ts-jest)

# package.json<a name=pckjs>\</\>

  - [package.json](./packageJSON.md)

# tsconfig.json<a name=tscnfgjs>\</\>

  - [tsconfig.json](./tsconfig.md)

# webpack.config.js<a name=webpk>\</\>

  - [webpack.config.js](./webpackconfig.md)
