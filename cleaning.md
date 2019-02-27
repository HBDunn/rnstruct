Cleaning-up "RED BOX"
=====================

https://gist.github.com/jarretmoses/c2e4786fd342b3444f3bc6beff32098d

`del %appdata%\Temp\react-native-* & cd android & gradlew clean & cd .. & del node_modules/ & npm cache clean --force & npm install & npm start -- --reset-cache`

or

`del %appdata%\Temp\react-native-* & cd android & gradlew clean & cd .. & del node_modules/ & npm cache clean --force & yarn install & react-native run-android`

sim-was-ok rm -rf $TMPDIR/react-* && rm -rf $TMPDIR/metro* && rm -rf $TMPDIR/haste-*

rm -rf node_modules && npm install
base-webpack react-native run-android -- --reset-cache

Acorn
====

Can be Ignored: 
acorn not installed, but it's a peerDependency of acorn-dynamic-import [#8779](https://github.com/webpack/webpack/issues/8779)

Yarn
====

[windows install](https://yarnpkg.com/lang/en/docs/install/#windows-stable)
[install](https://www.npmjs.com/package/yarn?activeTab=versions)

React-Native Versions
=====================

[goto](https://github.com/facebook/react-native/releases?after=v0.58.0)


Webpack-Config-Help
===================

[goto](https://webpack.js.org/configuration/resolve/#resolve-alias)

npm-check
=========

[install](https://www.npmjs.com/package/npm-check)

npm Object-assign BAD
=====================

npm i object-assign caused Red Box Fail


Webpack-Debug
=============

Target
------

Client on node: Uncaught ReferenceError: require is not defined
target ['web'](https://stackoverflow.com/questions/19059580/client-on-node-uncaught-referenceerror-require-is-not-defined)

Misc
----
 * fails react-native
	* filtering test with regex ```/^(?!.*\..*\.(js.?)$)(.*\.js.?)$ /```
	* skips .native.js(x) and .android.js(x), but webpack still fails on compile of react-native

 * Plugin/Preset files are not allowed to export objects, only functions [#8707](https://github.com/babel/babel/issues/8707)
 * Unable to resolve module `schedule/tracking` #21150(https://github.com/facebook/react-native/issues/21150)
 * [index.android.js vs index.js](https://stackoverflow.com/questions/44446523/unable-to-load-script-from-assets-index-android-bundle-on-windows/44476757#44476757)

 VSCODE
 ------
 
 [launch.json](https://stackoverflow.com/questions/34835082/how-to-debug-using-npm-run-scripts-from-vscode)
 