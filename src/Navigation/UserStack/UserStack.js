import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from 'Screens/Authentication/Login/LoginScreen';
import {RegistrationStack} from 'Navigation/RegistrationStack/RegistrationStack';
import {AddUserName} from 'Screens/Authentication/AddUserName/AddUserName';
import {ProjectList} from 'Screens/Projects/ProjectList';
import {ProjectDetails} from 'Screens/Projects/ProjectDetails';
import {AddProjectName} from 'Screens/NewProject/AddProjectName';
import {AddMembers} from 'Screens/NewProject/AddMembers';
import DailyWorkSchedule from 'Screens/DailyWorkSchedule/DailyWorkSchedule';
import {Reports} from 'Screens/Reports/Reports';
import {TeamMembers} from 'Screens/TeamMembers/TeamMembers';
import {RequestMembers} from 'Screens/TeamMembers/RequestMembers';
import {MonthReport} from 'Screens/Reports/MonthReport';
import {Calender} from 'Screens/Calender/Calender';

const Stack = createNativeStackNavigator();

export const UserStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProjectList"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProjectList" component={ProjectList} />
      <Stack.Screen name="AddProjectName" component={AddProjectName} />
      <Stack.Screen name="AddMembers" component={AddMembers} />
      <Stack.Screen name="DailyWorkSchedule" component={DailyWorkSchedule} />
      <Stack.Screen name="Reports" component={Reports} />
      <Stack.Screen name="ProjectDetails" component={ProjectDetails} />
      <Stack.Screen name="TeamMembers" component={TeamMembers} />
      <Stack.Screen name="RequestMembers" component={RequestMembers} />
      <Stack.Screen name="MonthReport" component={MonthReport} />
      <Stack.Screen name="Calender" component={Calender} />
    </Stack.Navigator>
  );
};