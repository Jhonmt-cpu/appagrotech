import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => {
  const deepLinking = {
    prefixes: ['http://192.168.15.29:3000', 'appagrotech://'],
    config: {
      screens: {
        ResetPassword: 'resetpassword/:token',
      },
    },
  };
  return (
    <NavigationContainer linking={deepLinking}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#f0f0f0"
        translucent
      />
      <AppProvider>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
