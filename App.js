import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {GStyles} from 'Components/GlobalStyle';
import {AppColors} from 'assets/AppColors';
import {RootNav} from 'Navigation/MainRootNav/RootNav';
import {Provider as StoreProvider} from 'react-redux';
import {store} from 'Redux/Store/Store';

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
