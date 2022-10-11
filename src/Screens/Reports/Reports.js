import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {GStyles, VerticalHeight} from 'Components/GlobalStyle';
import {AppHeader, BottomButton, Height} from 'Components/AppHeader';
import {AppColors} from 'assets/AppColors';
import {useNavigation} from '@react-navigation/native';

export const Reports = () => {
  const nav = useNavigation();
  return (
    <View style={GStyles.FlexPadding}>
      <AppHeader enableBack={true} showRight={false} />
      <VerticalHeight height={Height * 0.15} />
      <Text style={GStyles.AuthTextStyle}>Reports</Text>
      <VerticalHeight height={20} />
      <FlatList
        data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14]}
        keyExtractor={item => item}
        renderItem={({item, key}) => (
          <View key={key} style={{height: 50}}>
            <Text
              onPress={() => nav.navigate('MonthReport')}
              style={{color: AppColors.white1, fontSize: 22}}>
              Jan, 2022
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
