import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {GStyles, VerticalHeight} from 'Components/GlobalStyle';
import {AppHeader, BottomButton, Height} from 'Components/AppHeader';
import {HeaderTextWithInputField} from 'Screens/Authentication/components';
import {AppColors} from 'assets/AppColors';
import {useNavigation} from '@react-navigation/native';

export const AddProjectName = () => {
  const [Name, setName] = useState('');
  const nav = useNavigation();
  return (
    <View style={GStyles.Flex}>
      <AppHeader
        enableBack={true}
        rightText="1/2"
        rightTextColor={AppColors.white}
        rightTextFontSize={18}
      />
      <VerticalHeight height={Height * 0.15} />
      <HeaderTextWithInputField
        value={Name}
        onChangeText={e => setName(e)}
        MainText="Add"
        SubText="Project name"
      />

      <BottomButton
        onPress={() => nav.navigate('AddMembers', {name: Name})}
        disable={Name === '' ? true : false}
        title="Next"
      />
    </View>
  );
};

const styles = StyleSheet.create({});
