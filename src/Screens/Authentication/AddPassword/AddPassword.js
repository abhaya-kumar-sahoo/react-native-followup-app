import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {HeaderTextWithInputField, TextInputField} from '../components';
import {GStyles, VerticalHeight} from 'Components/GlobalStyle';
import {AppHeader, BottomButton, Height} from 'Components/AppHeader';
import {useNavigation} from '@react-navigation/native';
import {AppColors} from 'assets/AppColors';

export const AddPassword = ({route}) => {
  const [Password, setPassword] = useState('');
  const {UserName} = route.params;

  const nav = useNavigation();
  return (
    <View style={GStyles.Flex}>
      <AppHeader
        rightText="2/4"
        rightTextFontSize={18}
        rightTextColor={AppColors.white1}
        showLeft={false}
        enableBack={true}
      />
      <VerticalHeight height={Height * 0.2} />

      <HeaderTextWithInputField
        value={Password}
        onChangeText={e => setPassword(e)}
        MainText="Add"
        SubText="Password"
      />

      <BottomButton
        onPress={() => nav.navigate('ReTypePassword', {UserName, Password})}
        title="Next"
        disable={Password.length < 6 ? true : false}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
