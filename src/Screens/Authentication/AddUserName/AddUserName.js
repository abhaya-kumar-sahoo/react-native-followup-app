import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {HeaderTextWithInputField, TextInputField} from '../components';
import {GStyles, VerticalHeight} from 'Components/GlobalStyle';
import {AppHeader, BottomButton, Height} from 'Components/AppHeader';
import {useNavigation} from '@react-navigation/native';
import {AppColors} from 'assets/AppColors';
import {request} from 'ApiLogic/ApiCall';
import {APP_APIS} from 'ApiLogic/API_URL';
import DelayInput from 'react-native-debounce-input';
export const AddUserName = () => {
  const [UserName, setUserName] = useState('');
  const [response, setResponse] = useState('');

  const nav = useNavigation();

  const CheckUserExist = text => {
    request({
      url: APP_APIS.CHECK_USERNAME,
      body: JSON.stringify({name: text.replace(' ', '')}),
    })
      .then(res => {
        setResponse(res.msg);
      })
      .catch(err => {
        setResponse('');
      });
  };

  return (
    <View style={GStyles.Flex}>
      <AppHeader
        rightText="1/3"
        rightTextFontSize={18}
        rightTextColor={AppColors.white1}
        showLeft={false}
        // enableBack={true}
      />
      <VerticalHeight height={Height * 0.2} />

      <HeaderTextWithInputField
        value={UserName}
        // delay={1000}
        onChangeText={e => {
          setUserName(e.replace(' ', '')), CheckUserExist(e.replace(' ', ''));
        }}
        MainText="Add"
        SubText="Username"
        ErrorColor={
          response === 'Username available' ? AppColors.green : AppColors.Red1
        }
        text={UserName === '' ? '' : response}
      />

      <BottomButton
        onPress={() => nav.navigate('AddPassword', {UserName})}
        title="Next"
        disable={UserName === '' ? true : false}
      />
    </View>
  );
};
