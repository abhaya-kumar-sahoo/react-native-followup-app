import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {HeaderTextWithInputField, TextInputField} from '../components';
import {GStyles, VerticalHeight} from 'Components/GlobalStyle';
import {AppHeader, BottomButton, Height} from 'Components/AppHeader';
import {useNavigation} from '@react-navigation/native';
import {AppColors} from 'assets/AppColors';

export const AddPassword = () => {
  const [Password, setPassword] = useState('');
  const nav = useNavigation();
  return (
    <View style={GStyles.Flex}>
      <AppHeader
        rightText="2/3"
        rightTextFontSize={18}
        rightTextColor={AppColors.white1}
        showLeft={false}
      />
      <VerticalHeight height={Height * 0.2} />

      <HeaderTextWithInputField
        value={Password}
        onChangeText={e => setPassword(e)}
        MainText="Add"
        SubText="Password"
      />

      <BottomButton
        onPress={() => nav.navigate('ReTypePassword')}
        title="Next"
        disable={Password === '' ? true : false}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
