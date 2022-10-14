import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React from 'react';
import {
  GStyles,
  HorizontalLine,
  HorizontalSpace,
  VerticalHeight,
} from 'Components/GlobalStyle';
import {AppHeader, Height, Width} from 'Components/AppHeader';

import {AppColors} from 'assets/AppColors';

import Ripple from 'react-native-material-ripple';
import {useNavigation} from '@react-navigation/native';
import {
  BackArrowIcon,
  CalenderIcon,
  CalenderView,
  ChatIcon,
} from 'shared/Icon.Comp';

const DailyWorkSchedule = () => {
  const nav = useNavigation();
  return (
    <View style={GStyles.FlexPadding}>
      <VerticalHeight height={20} />
      <View style={GStyles.FlexRowSpcaBetw}>
        <Text onPress={() => nav.goBack()}>
          <BackArrowIcon />
        </Text>
        <View style={GStyles.FlexRow}>
          <Ripple onPress={() => nav.navigate('Calender')}>
            <CalenderIcon size={30} />
          </Ripple>
          <HorizontalSpace size={20} />
          <Ripple>
            <ChatIcon size={30} />
          </Ripple>
        </View>
      </View>
      <VerticalHeight height={30} />
      <View
        style={[
          GStyles.Center,
          {
            height: 300,
            width: Width * 0.85,
          },
        ]}>
        <View style={{left: 10}}>
          <CalenderView size={200} />
        </View>
        <View style={{position: 'absolute'}}>
          <Text style={styles.dataStyle}>27</Text>
          <Text style={styles.monthStyle}>jan, 22</Text>
        </View>
      </View>

      <View>
        <FlatList
          data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
          keyExtractor={i => i.toString()}
          ListFooterComponent={<VerticalHeight height={Height * 0.6} />}
          renderItem={({item, key}) => (
            <View
              style={{
                width: Width,
              }}>
              <View style={GStyles.FlexRowCenterAlign}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 40,
                    backgroundColor: AppColors.DarkGrey,
                  }}
                />
                <HorizontalSpace />
                <Text style={{color: AppColors.white1, fontSize: 18}}>
                  Abhaya
                </Text>
              </View>
              <VerticalHeight height={20} />

              <View style={GStyles.FlexRowCenterAlign}>
                <View
                  style={{
                    backgroundColor: AppColors.green,
                    width: 15,
                    height: 15,
                    borderRadius: 10,
                  }}
                />
                <HorizontalSpace />
                <Text style={{color: AppColors.white1, fontSize: 18}}>
                  Designing screenshots for playStore...
                </Text>
              </View>
              <VerticalHeight height={10} />
              <View style={GStyles.FlexRowCenterAlign}>
                <View
                  style={{
                    backgroundColor: AppColors.green,
                    width: 15,
                    height: 15,
                    borderRadius: 10,
                  }}
                />
                <HorizontalSpace />
                <Text style={{color: AppColors.white1, fontSize: 18}}>
                  Designing screenshots for playStore...
                </Text>
              </View>
              <VerticalHeight height={30} />
              <HorizontalLine
                height={40}
                alignSelf="center"
                size={Width * 0.8}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default DailyWorkSchedule;

const styles = StyleSheet.create({
  monthStyle: {
    color: AppColors.white1,
    fontSize: 12,
    top: 40,
    left: 10,
  },
  dataStyle: {
    color: AppColors.white1,
    fontSize: 60,
  },
});
