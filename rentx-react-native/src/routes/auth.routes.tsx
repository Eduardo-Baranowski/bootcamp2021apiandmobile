import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Confirmation} from '../screens/Confirmation';
import {SignIn} from '../screens/SignIn';
import {SignUpFirstStep} from '../screens/SignUp/SignUpFirstStep';
import {SignUpSecondStep} from '../screens/SignUp/SignUpSecondStep';

const {Navigator, Screen} = createNativeStackNavigator();

const Stack = createNativeStackNavigator();

export function AppRoutes() {
  return(
    <Navigator screenOptions={{headerShown:false}} initialRouteName='SignIn'>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
      />
      <Stack.Screen
        name="SignUpFirstStep"
        component={SignUpFirstStep}
      />
      <Stack.Screen
        name="SignUpSecondStep"
        component={SignUpSecondStep}
      />
      <Stack.Screen
        name="Confirmation"
        component={Confirmation}
      />
    </Navigator>
  )
}
