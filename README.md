# TODO App

## Quick Start

### Pre-requisites

Make sure you have `node` v12 installed. 
If not, it is recommended to install it using nvm (https://github.com/nvm-sh/nvm#install--update-script).

```shell
node --version
v12.14.0
```

### Install dependencies

Install npm dependencies:
```shell
yarn
```

### Start App

Run metro service. It is recommended to run it in separated terminal: 
```shell
yarn start
```

Note: If you change `.env` variables or any other configuration, you probably need to reset cache. 
To do so use the following command:

```shell
yarn start -- --reset-cache
```

### Run iOS

The following command runs a mobile application on default device:
```shell
yarn ios
```

### Run ANDROID

The following command runs a mobile application on default device:
```shell
yarn android
```

### Linting

To check the `linting` in project
```shell
yarn lint
```

To fix `linting` in project
```shell
yarn lint --fix
```

To generate apk file for android
```
cd android && ./gradlew assembleRelease
```

To generate aab build file to upload app on Google Play Store
```
cd android && ./gradlew bundleRelease
```


## Useful links

- ReactNative Project using typescript (https://reactnative.dev/docs/typescript)
- ReactNative Android App Icon and Name Update (https://www.youtube.com/watch?v=uw3SuJzX6CQ)
- AppIcon Generator (https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html)
- Generate APK file and Bundle file in React Native (https://www.youtube.com/watch?v=SXFnpo-6u1U, https://reactnative.dev/docs/signed-apk-android)
- Gradle build fail issue solution (https://github.com/facebook/react-native/issues/30729)