#Version Date **3/20/2019**

[![Build Status](https://travis-ci.org/HBDunn/rnstruct.svg?branch=master)](https://travis-ci.org/HBDunn/rnstruct)
[![Dependency Status](https://david-dm.org/HBDunn/rnstruct.svg)](https://david-dm.org/HBDunn/rnstruct)

[![devDependencies Status](https://david-dm.org/HBDunn/rnstruct/dev-status.svg)](https://david-dm.org/HBDunn/rnstruct?type=dev)
[![Codecov Coverage](https://img.shields.io/codecov/c/github/HBDunn/rnstruct/master.svg?style=flat-square)](https://codecov.io/gh/HBDunn/rnstruct/)
[![Known Vulnerabilities](https://snyk.io/test/github/HBDunn/rnstruct/badge.svg)](https://snyk.io/test/github/HBDunn/rnstruct)

# React React-Native Webpack Babel Typescript Jest Travis CI
##**[Migration & Debug Details](./docs/workup.md)** from Javascript React-Native 0.21]
# React-Native@58.4 Mobile & React Website Code-Base Share

Simplify Calculator: single source code architecture to run multiple devices:

- Android(tested) & iOS Apps with [react-native](https://facebook.github.io/react-native))
- Desktop App [TODO: Electron](http://electron.atom.io)
- Website App with [react](https://facebook.github.io/react)

  * Modified and adapted to react-native@**58.4** and react@**16.6.3** by HDunn <hdunn@peswim.com>.
  * MIT License.
  * Original [code] from Benoit Vallon.  
  * Robert O'Dowd authorized Benoit a beautiful ["Simplifycation" design](https://dribbble.com/shots/1973851-Simplifycation).

 [Final Draft ScreenShots]()

<<<<<<< HEAD
## What's next

Here are some thoughts about what can come next:

- Make the Website App Isomorphic/Universal

## Thank you Robert for your awesome design

I want to thank Robert O'Dowd who kindly authorized me the reuse his very beautiful design. The original design made by Robert was part of his project called "Simplifycation" visible [here](https://dribbble.com/shots/1973851-Simplifycation).

# How to build/run the projects
=======
| &nbsp; &nbsp; &nbsp; |   Webpage&nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; Android &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; |
|----------------------:|:--------------------------:|:--------------:|:-------------------------------------------------------:|:----------------------:|
| &nbsp; &nbsp; &nbsp; | ![](./docs/screencapture-localhost-8083-2019-03-14-22_36_59s.png) | &nbsp; &nbsp; &nbsp; | ![](./docs/Screenshot_1552624408s.png) | &nbsp; &nbsp; &nbsp; |  

## Build/run
>>>>>>> 1904c5ef... final

### Install

- `npm install` to install all the dependencies, React and React Native among others.

### With some versions of npm (>=v3.3.10 <=v3.6.0)

Some builds from npm included bugs while `npm install`. So if you are using a npm version within the range form 3.3.10 to 3.6.0 included, you must run `npm install` twice. Those versions including npm v3.3.12 are the ones bundled by default with node from version v5.1.0 to v5.5.0.

- `npm install npm`
- `npm install npm` run it twice, because of the packages won't be installed after the first run [#10985](https://github.com/npm/npm/issues/10985)

### The Mobile Apps (iOS & Android)

#### Set-Up for React Native

<<<<<<< HEAD
#### iOS
=======
##### iOS(Not currently tested)
>>>>>>> 1904c5ef... final

- OS X
- Xcode 6.3 or higher is recommended (Xcode only runs on Mac).
- Homebrew is the recommended way to install node, watchman, and flow.
- `brew install node`
- `brew install watchman`. We recommend installing watchman, otherwise you might hit a node file watching bug.
- `brew install flow`. If you want to use flow.

##### Android

- Install Android Studio & Build Tools
- [AVD](./docs/cleaning.md#avd)

#### Running the Mobile Apps

##### iOS

- Open iosApp.xcodeproj and hit run in Xcode.
- Hit cmd+R in your iOS simulator to reload the app and see your change!

##### Android

- Open an emulator. (Genymotion or run `android avd`)
- Run the `react-native run-android` in the root of this project.
- If trying to run on a device, read the following guide: http://facebook.github.io/react-native/docs/running-on-device-android.html#content

Congratulations! You've just successfully run the project as an iOS or Android App.

## The Website App

### Requirements for React

There isn't any additional requirements since you already installed the deps with `npm install`.

#### Quick start

- `npm run build` to build the project (at least the first time)
- `npm run serve-web` to preview in the browser at http://localhost:8000/index.web.html or http://localhost:8000/webpack-dev-server/index.web.html with webpack-dev-server and hot reload enabled

Congratulations! You've just successfully run the project as a Website App.

## The Desktop App

You can either run the project with [NW](http://nwjs.io) or [electron](http://electron.atom.io).

### Requirements for NW

To run the project, you are supposed to run something like:

`/path/to/nw .`

On OSX, the executable binary is in a hidden directory within the .app file. The easier solution to install it is to download the app on http://nwjs.io/ then copying it to your application folder. You will now be able to run:

`/Applications/nwjs.app/Contents/MacOS/nwjs .`

You can also setup an alias to call the binary.

`alias nw="/Applications/nwjs.app/Contents/MacOS/nwjs"`

### Quick start with NW

- `npm run build` to build the project (at least the first time)
- `npm run serve-nw` to launch the desktop app and enable livereload

Congratulations! You've just successfully run the project as a Desktop App.

### Quick start with Electron

- `npm run build` to build the project (at least the first time)
- `npm run serve-electron` to launch the desktop app and enable livereload

Congratulations! You've just successfully run the project as a Desktop App.

# Run the tests

To run the tests, simply run:

  ```js
    npm test
  ```
- partial screenshot passing

  ![Test](./docs/test--verbose.png "Test")

##Application Code Structure with Flux(simple Redux) Store

Single source code is all contained in the `src` directory

- `index.ios.(js | ts)` & `index.android.(js | ts)` are the entry points to build the iOS & Android Apps
- `index.(js | ts)` is the entry point to build the Website/Desktop App.

notes:
  - Typescript has been partially implemeted (work in progress at publish date) to show tool-chain functionality.
  - Webpack has not been optimized for production   

### Flux Architecture Actions/Stores

The [flux](https://facebook.github.io/flux) architecture, logic and data management, is shared
by all device builds.

### Components

Components are structured to share logic. Logic code paths are only split when a specific device requires different code base,
i.e. a react component ```<div>``` vs react-native component ```<TEXT>```, but the content is single source derived.

Each device's (web/mobile) component main `Class` is inherited from a logic defining base `Class`.
During a build the device main class imports a different *Render function* based on the file name signature.
The file extension `.ios.js`, `.android.js` or `.js` is will be picked by the build tool to import only the correct render file.

 - `.native.js` files contain code that is shared between both mobile platforms (iOS & Android).
 - `.ios.js` and `.android.js` files import the `.native.js` files, currently shared.

However, if a component (ios/android) needs a different platform specific code base, then the platform specific code resides in
io.js or .android.js file.

**Each Component** is defined by six files.

 - Screen component strucure:

	```
	Screen.js
	├── ScreenBase.(jsx?  tsx?)
	├── ScreenRender.ios.(jsx | tsx) (specific to iOS build
	├── ScreenRender.android.(jsx | tsx) (specific to Android build)
	├── ScreenRender.native.(jsx | tsx) (shared mobile app code - iOS & Android)
	└── ScreenRender.(jsx | tsx) (used during Website and Desktop build)
	```

The main `Class` file "Screen.js" which composes the files.

**The react-native compiler/bundler** will only comple  .android. or .ios. and .native. and **ignore** .js

  - js

	```js
	'use strict';

	import Base from './ScreenBase';
	import Render from './ScreenRender';

	export default class Screen extends Base {
	  constructor (props) {
		super(props);
	  }

	  render () {
		return Render.call(this, this.props, this.state);
	  }
	}
	```
  - tsx

    ```js
	'use strict';
	import * as React from 'react';

	interface Props {[key:string]:string};
	interface State {displayScreen:string};
	declare namespace JSX {
	  interface Element {}
	  interface ElementClass {
		render(): any;
	  }
	  interface IntrinsicElements {
		div: {
			className:string;
			style:any;
			};
	  }
	}

	export default function (props: Props,state:State): JSX.Element {
	  return (
		<div className='screen'>
		  {state.displayScreen}
		</div>
	  );
	}
	```
