// In App.js in a new project
import React, {useLayoutEffect, useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RegistrationStack} from 'Navigation/RegistrationStack/RegistrationStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginScreen} from 'Screens/Authentication/Login/LoginScreen';
import {
  getUserDetails,
  RestoreToken,
  saveProgress,
} from 'Redux/reducers/Authentication/AuthReducer';
import {useDispatch, useSelector} from 'react-redux';
import {UserStack} from 'Navigation/UserStack/UserStack';
import {SplashScreen} from 'Navigation/SplashScreen/SplashScreen';

export const RootNav = () => {
  const Stack = createNativeStackNavigator();
  const {token, proceedStatus, loading, SplashLoading} = useSelector(
    state => state.UserAuth,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem('token')
      .then(res => {
        dispatch(RestoreToken(res));
        // console.log(res);
        dispatch(getUserDetails(res));
      })
      .catch(err => {
        console.log(err);
      });
    AsyncStorage.getItem('proceedStatus')
      .then(res => {
        dispatch(saveProgress({proceedStatus: res}));
        // console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!SplashLoading ? (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        ) : (
          <>
            {token === null ? (
              <Stack.Screen
                name="RegistrationStack"
                children={RegistrationStack}
              />
            ) : (
              <Stack.Screen name="UserStack" children={UserStack} />
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
