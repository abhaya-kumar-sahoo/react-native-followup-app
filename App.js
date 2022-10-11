import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {LoginScreen} from 'Screens/Authentication/Login/LoginScreen';
import {GStyles} from 'Components/GlobalStyle';
import {LoginStack} from 'Navigation/LoginStack/LoginStack';
import {AppColors} from 'assets/AppColors';
import {RootNav} from 'Navigation/MainRootNav/RootNav';
import {Provider as StoreProvider} from 'react-redux';
import {store} from 'Redux/Store/Store';
import {SplashScreen} from 'Navigation/SplashScreen/SplashScreen';

export const App = () => {
  return (
    <SafeAreaView style={GStyles.Flex}>
      <StoreProvider store={store}>
        <StatusBar backgroundColor={AppColors.DarkBG} />
        <RootNav />
      </StoreProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
