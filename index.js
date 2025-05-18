import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import App from './src/App';

if (__DEV__) {
  import('./reactotron-config').then(() =>
    console.log('Reactotron start work!!'),
  );
}

AppRegistry.registerComponent(appName, () => App);
