import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from 'react-native';

import TabRoutes from './tab.routes';

import Profile from '../pages/Profile';

import AnimalDetails from '../pages/AnimalDetails';
import CadastroAnimal from '../pages/CadastroAnimal';
import EditAnimal from '../pages/EditAnimal';

import RegisterDoenca from '../pages/RegisterDoenca';
import DoencaDetails from '../pages/DoencaDetails';
import EditDoenca from '../pages/EditDoenca';

import VacineDetails from '../pages/VacineDetails';
import RegisterVacine from '../pages/RegisterVacine';
import EditVacine from '../pages/EditVacine/index';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <>
    <StatusBar backgroundColor="#74d469" />
    <App.Navigator screenOptions={{ headerShown: false }}>
      <App.Screen
        name="MainBottom"
        component={TabRoutes}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <App.Screen name="VacineDetails" component={VacineDetails} />
      <App.Screen name="RegisterVacine" component={RegisterVacine} />
      <App.Screen name="EditVacine" component={EditVacine} />

      <App.Screen name="AnimalDetails" component={AnimalDetails} />
      <App.Screen name="CadastroAnimal" component={CadastroAnimal} />
      <App.Screen name="EditAnimal" component={EditAnimal} />

      <App.Screen name="RegisterDoenca" component={RegisterDoenca} />
      <App.Screen name="DoencaDetails" component={DoencaDetails} />
      <App.Screen name="EditDoenca" component={EditDoenca} />

      <App.Screen name="Profile" component={Profile} />
    </App.Navigator>
  </>
);

export default AppRoutes;
