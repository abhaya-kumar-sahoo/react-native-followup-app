import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
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
  setUserDetails,
} from 'Redux/reducers/Authentication/AuthReducer';
import {Loader} from 'Components/Loader';
import {AppColors} from 'assets/AppColors';
import Icon from 'react-native-vector-icons/Ionicons';
export const LoginScreen = () => {
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [ErrorText, setErrorText] = useState('');

  const nav = useNavigation();
  const dispatch = useDispatch();
  const {proceedStatus, token, UserData} = useSelector(state => state.UserAuth);

  const Login = () => {
    setLoading(true);
    setErrorText('');

    const data = {
      name: UserName,
      password: Password,
    };
    request({url: APP_APIS.LOGIN, body: JSON.stringify(data)})
      .then(async res => {
        setLoading(false);
        if (!res.error) {
          await AsyncStorage.setItem('token', res.token);
          await AsyncStorage.setItem('proceedStatus', 'into');

          dispatch(saveProgress({proceedStatus: 'into'}));
          dispatch(setUserDetails({data: res.data}));
          dispatch(RestoreToken(res.token));
        } else {
          setErrorText(res.msg);
        }
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });

    // nav.navigate('ProjectList')
  };

  return (
    <SafeAreaView style={[GStyles.Flex, GStyles.Center]}>
      <AppHeader
        showLeft={false}
        onPressRight={() => {
          // dispatch(saveProgress({proceedStatus: 'register'})),
          //   AsyncStorage.setItem('proceedStatus', 'register');
          nav.navigate('AddUserName');
        }}
      />

      <Loader visible={loading} />

      <View style={{marginBottom: Height * 0.2}}>
        <TextInputField value={UserName} onChangeText={e => setUserName(e)} />
        <VerticalHeight height={35} />
        <TextInputField
          value={Password}
          onChangeText={e => setPassword(e)}
          headerText="Enter Password"
        />
      </View>

      {ErrorText.length === 0 ? (
        <></>
      ) : (
        <View style={GStyles.FlexRowCenter}>
          <Icon name="warning-outline" size={15} color={AppColors.Red} />
          <Text style={styles.ErrorText}>{ErrorText}</Text>
        </View>
      )}
      <BottomButton
        onPress={Login}
        disable={Password.length < 6 || UserName.length < 3 ? true : false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ErrorText: {
    color: AppColors.Red,
    alignSelf: 'center',
    textAlign: 'center',
    paddingLeft: 10,
  },
});
