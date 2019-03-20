Speed-Up Migration
==================
### cmd-line emulator 

  * Use adb [log]
  * start in bash shell  ``` $ adb logcat *:S ReactNativeJS:V ReactNative:V```
  * clear log bash shell ``` $ adb log -c```

### Avoid "Red-Blocks" on Android

In general found that using ```npm start``` in a separate terminal did not perform as well as ```react-native``.
Apparently there is a different start-up used in the react-native scripts.

Clearing cache and Hast-map "react-native run-android -- --reset-cache" is the correct command.
Also monitor port 8080 + (8081 etc) ports with netstat to keep node.exe and 808? ports available.
 
### #checking on server state - requires elevation

  * windows
  
      ```netstat -bon | find "node.exe"```
	
      ```taskkill /f /im "node.exe"```

	then check port 8081 free: ```netstat -bon | find "8081"```

  * tasklist - with ```tasklist | find "file.ext"```
	
  * bash
  
      ```netstat -bon | grep -C3 "node.exe"```
	
	  ```taskkill //f //im "node.exe"```
	
	then check port 8081 free: ```netstat -bon | find "8081"```
	
  * tasklist - with a ```tasklist | grep ``` 
  * watch adb.exe too.  
  
### <a name=avd/>avd
  
  * Have to install Android Studio with **tools**.
  * Set paths to the tool-set.  
  * Make a shell script.
  
    startemu28.sh
	
	```
	#!/usr/bin/bash 
	echo 'available avds'
	/c/Users/YOUR_HOME_DIR/AppData/local/Android/sdk/emulator/emulator -list-avds
	echo 'starting Nexus_5X_API_28_x86 - edit startemu28.sh to change'
	/c/Users/YOUR_HOME_DIR/AppData/local/Android/sdk/emulator/emulator -avd Nexus_5X_API_28_x86
	
	# options - I have built with Android Studio using Avd Manager
	# Nexus_5X_API_27
	# Nexus_5X_API_28_x86
	```
	
Cleaning-up "RED BOX"
=====================

Resetting HAST-MAP & Caches
---------------------------

  [Saving Throw](https://gist.github.com/jarretmoses/c2e4786fd342b3444f3bc6beff32098d) Thanks SO  

### Windows-cmd

 * `del %appdata%\Temp\react-native-* & cd android & gradlew clean & cd .. & del node_modules/ & npm cache clean --force & npm install & npm start -- --reset-cache`
    or
 * `del %appdata%\Temp\react-native-* & cd android & gradlew clean & cd .. & del node_modules/ & npm cache clean --force & yarn install & react-native run-android`

### Bash

 * rm -rf $TMPDIR/react-* && rm -rf $TMPDIR/metro* && rm -rf $TMPDIR/haste-*   
   equal to  
   react-native run-android -- --rest-cache

### nuke and pave

  * rm -rf node_modules && npm ci

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


 ### VSCODE

 [launch.json](https://stackoverflow.com/questions/34835082/how-to-debug-using-npm-run-scripts-from-vscode)

 Git
 ---
 
  [remove](https://help.github.com/en/articles/removing-sensitive-data-from-a-repository) node_modules from index after tracking for debug
 
  use : git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch PATH-TO-YOUR-FILE-WITH-SENSITIVE-DATA' --prune-empty --tag-name-filter cat -- --all
  
  ```git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch node_modules/**/*' --prune-empty --tag-name-filter cat -- --all```
  
 Debug Webpack **node-nightly **
 -------------------------------

  *  [debugging](https://webpack.js.org/contribute/debugging/)
  *  [debug-webpack-with-chrome-dev-tools](https://medium.com/webpack/webpack-bits-learn-and-debug-webpack-with-chrome-dev-tools-da1c5b19554)
  *  chrome browser ```chrome://inspect/```