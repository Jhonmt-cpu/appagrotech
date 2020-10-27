import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from 'react-native';

import Dashboard from '../pages/Dashboard';

import Profile from '../pages/Profile';

import AnimalsList from '../pages/AnimalsList';
import AnimalDetails from '../pages/AnimalDetails';
import CadastroAnimal from '../pages/CadastroAnimal';
import RegisterDoenca from '../pages/RegisterDoenca';

import RegisterVacine from '../pages/RegisterVacine';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <>
    <StatusBar backgroundColor="#74d469" />
    <App.Navigator screenOptions={{ headerShown: false }}>
      <App.Screen name="Dashboard" component={Dashboard} />

      <App.Screen name="AnimalsList" component={AnimalsList} />
      <App.Screen name="CadastroAnimal" component={CadastroAnimal} />
      <App.Screen name="AnimalDetails" component={AnimalDetails} />
      <App.Screen name="RegisterDoenca" component={RegisterDoenca} />

      <App.Screen name="RegisterVacine" component={RegisterVacine} />

      <App.Screen name="Profile" component={Profile} />
    </App.Navigator>
  </>
);

export default AppRoutes;
