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
import {TeamMembers} from 'Screens/ProjectMembers/ProjectMembers';
import {RequestMembers} from 'Screens/ProjectMembers/RequestMembers';
import {MonthReport} from 'Screens/Reports/MonthReport';
import {Calender} from 'Screens/Calender/Calender';
import {PostDetails} from 'Screens/DailyWorkSchedule/PostDetails';
import {AddNotes} from 'Screens/DailyWorkSchedule/AddNotes';
import {ProfileScreen} from 'Screens/ProfileScreen/ProfileScreen';
import {AddPhoto} from 'Screens/Authentication/AddPhoto/AddPhoto';
import {ChatScreen} from 'Screens/DailyWorkSchedule/Chat/ChatScreen';

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
      <Stack.Screen name="PostDetails" component={PostDetails} />
      <Stack.Screen name="AddNotes" component={AddNotes} />

      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
};
