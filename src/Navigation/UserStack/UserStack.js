import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Timeline} from 'screens/Timeline/Timeline';
import {Setting} from 'screens/Setting/Setting';

const Stack = createNativeStackNavigator();

export const UserStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProjectList"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Timeline" component={Timeline} />
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>
  );
};
