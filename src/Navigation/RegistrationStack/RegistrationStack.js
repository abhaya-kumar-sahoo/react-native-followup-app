import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from 'Screens/Authentication/Login/LoginScreen';
import { AddUserName } from 'Screens/Authentication/AddUserName/AddUserName';
import { AddPassword } from 'Screens/Authentication/AddPassword/AddPassword';
import { ReTypePassword } from 'Screens/Authentication/AddPassword/RetypePassword';
import { LoginStack } from 'Navigation/LoginStack/LoginStack';

const Stack = createNativeStackNavigator();

export const RegistrationStack = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown:false}} >
        <Stack.Screen name="AddUserName" component={AddUserName} />
        <Stack.Screen name="AddPassword" component={AddPassword} />
        <Stack.Screen name="ReTypePassword" component={ReTypePassword} />
        <Stack.Screen name="LoginStack" children={LoginStack} />

        
      </Stack.Navigator>
  );
}




