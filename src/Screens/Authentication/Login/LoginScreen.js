import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {GStyles, VerticalHeight} from 'Components/GlobalStyle';
import {AppHeader, BottomButton, Height} from 'Components/AppHeader';
import {TextInputField} from '../components';
import {useNavigation} from '@react-navigation/native';
import {request} from 'ApiLogic/ApiCall';
import {APP_APIS} from 'ApiLogic/API_URL';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  getUserDetails,
  RestoreToken,
  saveProgress,
} from 'Redux/reducers/Authentication/AuthReducer';

export const LoginScreen = () => {
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const nav = useNavigation();
  const dispatch = useDispatch();
  const {proceedStatus, token, UserData} = useSelector(state => state.UserAuth);

  const Login = () => {
    const data = {
      name: UserName,
      password: Password,
    };
    request({url: APP_APIS.LOGIN, body: JSON.stringify(data)})
      .then(async res => {
        if (res) {
          await AsyncStorage.setItem('token', res.token);
          dispatch(saveProgress({proceedStatus: 'into'}));
          dispatch(getUserDetails(res.data));
          dispatch(RestoreToken(res.token));
        }
      })
      .catch(e => {
        console.log(e);
      });

    // nav.navigate('ProjectList')
  };

  return (
    <SafeAreaView style={[GStyles.Flex, GStyles.Center]}>
      <AppHeader
        showLeft={false}
        onPressRight={() => dispatch(saveProgress({proceedStatus: 'register'}))}
      />

      <View style={{marginBottom: Height * 0.2}}>
        <TextInputField value={UserName} onChangeText={e => setUserName(e)} />
        <VerticalHeight height={35} />
        <TextInputField
          value={Password}
          onChangeText={e => setPassword(e)}
          headerText="Enter Password"
        />
        {/* <CalenderViewIcon size={30} color={AppColors.Red} /> */}
      </View>
      <BottomButton
        onPress={Login}
        disable={UserName === '' || Password === '' ? true : false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
