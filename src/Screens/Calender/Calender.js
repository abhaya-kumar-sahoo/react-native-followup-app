import {AppColors} from 'assets/AppColors';
import {AppHeader} from 'Components/AppHeader';
import {GStyles, VerticalHeight} from 'Components/GlobalStyle';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import NextIcon from 'react-native-vector-icons/MaterialIcons';
export const Calender = () => {
  return (
    <View style={[GStyles.FlexPadding, GStyles.Center]}>
      <AppHeader enableBack={true} showRight={false} />
      <Text style={{color: AppColors.white1, fontWeight: '900', fontSize: 30}}>
        Calender
      </Text>
      <VerticalHeight height={30} />
      <CalendarPicker
        textStyle={{
          color: AppColors.white2,
        }}
        dayShape="square"
        yearTitleStyle={{color: AppColors.white1}}
        customDatesStyles={{color: 'white'}}
        todayBackgroundColor={AppColors.green1}
        nextComponent={
          <NextIcon name="navigate-next" size={35} color={AppColors.white} />
        }
        previousComponent={
          <NextIcon name="arrow-back-ios" size={21} color={AppColors.white} />
        }
        horizontal
        // selectedDayColor={AppColors.VeryDarkGrey}
        selectedDayColor={AppColors.green}
        selectedDayTextColor={AppColors.white}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
