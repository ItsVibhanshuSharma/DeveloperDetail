import {Text, LogBox, TextInput} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import Routes from './src/navigation/routes';
import { colors } from './src/shared/theme/colors';
import store from './src/store/store';

export default function App() {
  return (
    <SafeAreaProvider style={{flex: 1 , backgroundColor:colors.backgroundColor}}>
      <Provider store={store}>
      <Routes />
      </Provider>
    </SafeAreaProvider>
  );
}
