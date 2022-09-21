import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {RootNav} from './src/RootNav/RootNav';
import {Provider as PaperProvider} from 'react-native-paper';
import {LoginScreen} from 'Screens/Authentication/Login/LoginScreen';
import {GStyles} from 'Components/GlobalStyle';
import {LoginStack} from 'Navigation/LoginStack/LoginStack';
import {AppColors} from 'assets/AppColors';

export const App = () => {
  return (
    <SafeAreaView style={GStyles.Flex}>
      <StatusBar backgroundColor={AppColors.DarkBG} />
      <LoginStack />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
