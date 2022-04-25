## **Important**

In order for the emulator to communicate with auth service without any obstacles please explicitly set your network's IP (eg: `192.168.100.1`) in this configuration [file](./app/hooks/useConfig.tsx). Having it set to `localhost` works for web but might not work when using the expo app in emulator.

<br/>

## About workspace

This is a Yarn workspace. It consists of two packages:

`app` a React Native application bootstrapped using Expo for convenience.  
`service` auth service **included in the assignment by default**.

<br/>

## Prerequisites

In order to run the app you need to install dependencies first.  
Run `yarn install` from the root directory to install required packages.

<br/>

## Available Scripts

### `yarn start:service`

Runs the auth service at [http://localhost:3000](http://localhost:3000). Pin required to log in will be in the server logs.

### `yarn start:app`

Launches interactive CLI for running the application on Android/iOS/Web.  
**The service and the app should be running on the same host for the full functionality**.

#### `yarn start:app:web`

Launches the app in a web browser specifically.  
Open [http://localhost:19006](http://localhost:19006) to view it in the browser.

### `yarn test:app`

Will run all available test suites.
