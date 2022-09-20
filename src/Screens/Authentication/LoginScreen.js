import {KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GStyles, VerticalHeight} from 'Components/GlobalStyle';
import {AppHeader, BottomButton, Height} from 'Components/AppHeader';
import {TextInputField} from './components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const LoginScreen = () => (
  <SafeAreaView style={[GStyles.Flex, GStyles.Center]}>
    <AppHeader showLeft={false} />
    {/* <ScrollView keyboardShouldPersistTaps={'always'}>
        <KeyboardAwareScrollView> */}

    <View style={{marginBottom:Height*0.2}}>
      <TextInputField  />
      <VerticalHeight height={35} />
      <TextInputField headerText='Enter Password' />
    </View>
    <BottomButton />
{/* 
    </KeyboardAwareScrollView>

      </ScrollView> */}

  </SafeAreaView>
);

const styles = StyleSheet.create({});
