import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {HeaderTextWithInputField, TextInputField} from '../components';
import {GStyles, VerticalHeight} from 'Components/GlobalStyle';
import {AppHeader, BottomButton, Height} from 'Components/AppHeader';
import {useNavigation} from '@react-navigation/native';
import {AppColors} from 'assets/AppColors';
import {request} from 'ApiLogic/ApiCall';
import {APP_APIS} from 'ApiLogic/API_URL';
import {
  getUserDetails,
  saveProgress,
} from 'Redux/reducers/Authentication/AuthReducer';
import {useDispatch} from 'react-redux';

export const ReTypePassword = ({route}) => {
  const [CPassword, setCPassword] = useState('');
  const {UserName, Password} = route.params;
  const dispatch = useDispatch();
  const Registration = async () => {
    if (Password === CPassword) {
      const data = {
        name: UserName,
        password: Password,
        cPassword: CPassword,
      };

      request({url: APP_APIS.REGISTER, body: JSON.stringify(data)})
        .then(result => {
          dispatch(saveProgress({proceedStatus: 'login'}));
        })
        .catch(e => {
          console.log('err', e);
        });
    }
  };

  const nav = useNavigation();
  return (
    <View style={GStyles.Flex}>
      <AppHeader
        rightText="3/3"
        rightTextFontSize={18}
        rightTextColor={AppColors.white1}
        showLeft={false}
      />
      <VerticalHeight height={Height * 0.18} />

      <HeaderTextWithInputField
        value={CPassword}
        onChangeText={e => setCPassword(e)}
        MainText="Re-type"
        SubText="Password"
      />

      <BottomButton
        onPress={Registration}
        title="Next"
        disable={CPassword === '' ? true : false}
      />
    </View>
  );
};
