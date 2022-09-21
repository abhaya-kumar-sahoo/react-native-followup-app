import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {HeaderTextWithInputField, TextInputField} from '../components';
import {GStyles, VerticalHeight} from 'Components/GlobalStyle';
import {AppHeader, BottomButton, Height} from 'Components/AppHeader';
import {useNavigation} from '@react-navigation/native';
import {AppColors} from 'assets/AppColors';

export const AddUserName = () => {
  const [UserName, setUserName] = useState('');
  const nav = useNavigation();
  return (
    <View style={GStyles.Flex}>
      <AppHeader
        rightText="1/3"
        rightTextFontSize={18}
        rightTextColor={AppColors.white1}
        showLeft={false}
      />
      <VerticalHeight height={Height * 0.2} />

      <HeaderTextWithInputField
        value={UserName}
        onChangeText={e => setUserName(e)}
        MainText="Add"
        SubText="Username"
      />

      <BottomButton
        onPress={() => nav.navigate('AddPassword')}
        title="Next"
        disable={UserName === '' ? true : false}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
