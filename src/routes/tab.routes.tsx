import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

import Dashboard from '../pages/Dashboard';
import AnimalsList from '../pages/AnimalsList';
import VacinesList from '../pages/VacinesList';

const Tab = createBottomTabNavigator();

const TabRoutes: React.FC = () => (
  <Tab.Navigator
    tabBarOptions={{
      labelPosition: 'beside-icon',
      activeTintColor: '#74d469',
      labelStyle: {
        fontSize: 12,
      },
      inactiveTintColor: '#B7B7CC',
    }}
  >
    <Tab.Screen
      options={{
        tabBarIcon: ({ color }) => (
          <Icon size={25} name="calendar" color={color} />
        ),
        title: 'Home',
      }}
      name="Dashboard"
      component={Dashboard}
    />
    <Tab.Screen
      name="AnimalsList"
      options={{
        tabBarIcon: ({ color }) => (
          <IconMCI size={27} name="cow" color={color} />
        ),
        title: 'Gado',
      }}
      component={AnimalsList}
    />

    <Tab.Screen
      name="VacinesList"
      options={{
        tabBarIcon: ({ color }) => (
          <Icon5 size={25} name="syringe" color={color} />
        ),
        title: 'Vacinas',
      }}
      component={VacinesList}
    />
  </Tab.Navigator>
);

export default TabRoutes;
