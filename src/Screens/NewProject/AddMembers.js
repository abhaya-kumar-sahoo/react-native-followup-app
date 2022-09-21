import {FlatList, StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {AppHeader, BottomButton, Height, Width} from 'Components/AppHeader';
import {
  AppButton,
  GStyles,
  HorizontalSpace,
  VerticalHeight,
} from 'Components/GlobalStyle';
import {HeaderTextWithInputField} from 'Screens/Authentication/components';
import {useNavigation} from '@react-navigation/native';
import {AppColors} from 'assets/AppColors';

export const AddMembers = () => {
  const [Name, setName] = useState('');
  const nav = useNavigation();
  return (
    <View style={GStyles.Flex}>
      <AppHeader
        enableBack={true}
        rightText="2/2"
        rightTextColor={AppColors.white}
        rightTextFontSize={18}
      />
      <VerticalHeight height={Height * 0.15} />
      <HeaderTextWithInputField
        value={Name}
        onChangeText={e => setName(e)}
        MainText="Add"
        SubText="Members"
        placeholder='Search users'
      />
      <VerticalHeight height={40} />
      <View style={{height: Height * 0.3}}>
        <FlatList
          data={[0, 1, 2, 3, 4, 5, 6]}
          ItemSeparatorComponent={<VerticalHeight height={20} />}
          renderItem={({item, key}) => (
            <View
              style={[
                GStyles.FlexRowSpcaBetw,
                {width: Width, paddingHorizontal: 20},
              ]}>
              <View style={GStyles.FlexRowCenterAlign}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    backgroundColor: AppColors.MediumGrey1,
                  }}
                />
                <HorizontalSpace />
                <Text style={{color: AppColors.white1, fontSize: 18}}>
                  Udit
                </Text>
              </View>
              <AppButton
                width={65}
                height={30}
                fontSize={13}
                borderRadius={6}
                text="Request"
              />
            </View>
          )}
        />
      </View>

      <BottomButton
        onPress={() => nav.navigate('AddMembers')}
        disable={Name === '' ? true : false}
        title="Done"
      />
    </View>
  );
};

const styles = StyleSheet.create({});
