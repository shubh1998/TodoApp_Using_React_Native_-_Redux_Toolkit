# TODO App

## Quick Start

### Pre-requisites

Make sure you have `node` v12 installed. 
If not, it is recommended to install it using nvm (https://github.com/nvm-sh/nvm#install--update-script).

```shell
> node --version
v12.14.0
```

### Install dependencies

Install npm dependencies:
```shell
> yarn
```

### Start App

Run metro service. It is recommended to run it in separated terminal: 
```shell
> yarn start
```

Note: If you change `.env` variables or any other configuration, you probably need to reset cache. 
To do so use the following command:

```shell
> yarn start -- --reset-cache
```

### Run iOS

The following command runs a mobile application on default device:
```shell
> yarn ios
```

### Run ANDROID

The following command runs a mobile application on default device:
```shell
> yarn android
```

### Linting

To check the `linting` in project
```shell
> yarn lint
```

To fix `linting` in project
```shell
> yarn lint --fix
```


## Useful links

- ReactNative Project using typescript (https://reactnative.dev/docs/typescript)