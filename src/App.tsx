import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const deepLinking = {
    prefixes: ['https://reactdeploy.devjhon.com', 'appagrotech://'],
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
