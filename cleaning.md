Cleaning-up "RED BOX"
=====================

Resetting HAST-MAP & Caches
---------------------------

  [Saving Throw](https://gist.github.com/jarretmoses/c2e4786fd342b3444f3bc6beff32098d) Thanks SO  

###Windows-cmd

 * `del %appdata%\Temp\react-native-* & cd android & gradlew clean & cd .. & del node_modules/ & npm cache clean --force & npm install & npm start -- --reset-cache`
    or
 * `del %appdata%\Temp\react-native-* & cd android & gradlew clean & cd .. & del node_modules/ & npm cache clean --force & yarn install & react-native run-android`

###Bash

 * rm -rf $TMPDIR/react-* && rm -rf $TMPDIR/metro* && rm -rf $TMPDIR/haste-*   
   equal to  
   react-native run-android -- --rest-cache
   
###nuke and pave
   
  * rm -rf node_modules && npm install

Package Management 
==================

Acorn
-----

Can be Ignored: 
acorn not installed, but it's a peerDependency of acorn-dynamic-import [#8779](https://github.com/webpack/webpack/issues/8779)

Yarn - I reverted to npm
------------------------

  * [windows install](https://yarnpkg.com/lang/en/docs/install/#windows-stable)
  * [install](https://www.npmjs.com/package/yarn?activeTab=versions)

npm-check
---------

  [install](https://www.npmjs.com/package/npm-check)

npm Object-assign BAD
---------------------

  npm i object-assign caused Red Box Fail

React-Native Versions
---------------------

  [Saving Throw SO Ref](https://github.com/facebook/react-native/releases?after=v0.58.0)


Webpack-Config-Help?
====================

  [Saving Throw SO Ref](https://webpack.js.org/configuration/resolve/#resolve-alias)

  
MiniCssExtractPlugin
--------------------

[mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin)


Webpack-Debug
-------------

###Target

 *Error - Client on node: Uncaught ReferenceError: require is not defined
  target: ['web'](https://stackoverflow.com/questions/19059580/client-on-node-uncaught-referenceerror-require-is-not-defined)

###Misc

 * fails react-native "Can not resolve ... in react-native/react-native-implementations.js
   check that web/electron components are NOT referencing react-native 
 * Plugin/Preset files are not allowed to export objects, only functions [#8707](https://github.com/babel/babel/issues/8707)
 * Unable to resolve module `schedule/tracking` [#21150](https://github.com/facebook/react-native/issues/21150)
 * [index.android.js vs index.js](https://stackoverflow.com/questions/44446523/unable-to-load-script-from-assets-index-android-bundle-on-windows/44476757#44476757)

 ###VSCODE
 
 [launch.json](https://stackoverflow.com/questions/34835082/how-to-debug-using-npm-run-scripts-from-vscode)
 
 