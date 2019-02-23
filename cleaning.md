Cleaning-up "RED BOX"
=====================

https://gist.github.com/jarretmoses/c2e4786fd342b3444f3bc6beff32098d

`del %appdata%\Temp\react-native-* & cd android & gradlew clean & cd .. & del node_modules/ & npm cache clean --force & npm install & npm start -- --reset-cache`

or

`del %appdata%\Temp\react-native-* & cd android & gradlew clean & cd .. & del node_modules/ & npm cache clean --force & yarn install & react-native run-android`

sim-was-ok rm -rf $TMPDIR/react-* && rm -rf $TMPDIR/metro* && rm -rf $TMPDIR/haste-*

base-webpack react-native run-android -- --reset-cache