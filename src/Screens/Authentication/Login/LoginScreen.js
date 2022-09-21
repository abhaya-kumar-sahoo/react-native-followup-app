import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {GStyles, VerticalHeight} from 'Components/GlobalStyle';
import {AppHeader, BottomButton, Height} from 'Components/AppHeader';
import {TextInputField} from '../components';
import {useNavigation} from '@react-navigation/native';



export const LoginScreen = () => {
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const nav = useNavigation();
  return (
    <SafeAreaView style={[GStyles.Flex, GStyles.Center]}>
      <AppHeader
        showLeft={false}
        onPressRight={() => nav.navigate('RegistrationStack')}
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
      onPress={()=>nav.navigate('ProjectList')}
        disable={UserName === '' || Password === '' ? true : false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
