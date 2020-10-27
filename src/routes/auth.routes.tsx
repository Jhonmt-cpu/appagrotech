import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import SendForgotEmail from '../pages/SendForgotEmail';
import ResetPassword from '../pages/ResetPassword';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator screenOptions={{ headerShown: false }}>
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />

    <Auth.Screen name="SendForgotEmail" component={SendForgotEmail} />
    <Auth.Screen name="ResetPassword" component={ResetPassword} />
  </Auth.Navigator>
);

export default AuthRoutes;
