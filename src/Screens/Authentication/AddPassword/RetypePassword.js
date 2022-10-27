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
import {Loader} from 'Components/Loader';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ReTypePassword = ({route}) => {
  const [CPassword, setCPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [ErrorText, setErrorText] = useState('');

  const {UserName, Password} = route.params;
  const dispatch = useDispatch();
  const nav = useNavigation();

  const Registration = async () => {
    setLoading(true);
    setErrorText('');

    try {
      if (Password === CPassword) {
        const data = {
          name: UserName,
          password: Password,
          cPassword: CPassword,
        };

        request({url: APP_APIS.REGISTER, body: JSON.stringify(data)})
          .then(result => {
            setLoading(false);

            if (result.error) {
              setErrorText(res.msg);
            } else {
              // AsyncStorage.setItem('proceedStatus', 'login');
              // dispatch(saveProgress({proceedStatus: 'login'}));
              nav.navigate('LoginScreen');
            }
          })
          .catch(e => {
            console.log('err', e);
            setLoading(false);
          });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <View style={GStyles.Flex}>
      <AppHeader
        rightText="3/3"
        rightTextFontSize={18}
        rightTextColor={AppColors.white1}
        showLeft={false}
        enableBack={true}
      />
      <VerticalHeight height={Height * 0.18} />
      <Loader visible={loading} />

      <HeaderTextWithInputField
        value={CPassword}
        onChangeText={e => setCPassword(e)}
        MainText="Re-type"
        SubText="Password"
      />
      {ErrorText.length === 0 ? (
        <></>
      ) : (
        <View style={GStyles.FlexRowCenter}>
          <Icon name="warning-outline" size={15} color={AppColors.Red} />
          <Text style={styles.ErrorText}>{ErrorText}</Text>
        </View>
      )}
      <BottomButton
        onPress={Registration}
        title="Next"
        disable={CPassword.length < 6 ? true : false}
      />
    </View>
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
