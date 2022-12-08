import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GStyles, HorizontalLine, VerticalHeight} from 'Components/GlobalStyle';
import {AppHeader, Height, Width} from 'Components/AppHeader';
import {AppColors} from 'assets/AppColors';
import {useNavigation} from '@react-navigation/native';
import {BackArrowIcon} from 'shared/Icon.Comp';

export const ProjectDetails = ({route}) => {
  const {data} = route.params;
  const nav = useNavigation();
  return (
    <SafeAreaView style={GStyles.FlexPadding}>
      <VerticalHeight height={15} />
      <Text onPress={() => nav.goBack()}>
        <BackArrowIcon />
      </Text>
      <VerticalHeight height={Height * 0.1} />
      <Text style={GStyles.AuthTextStyle}>{data.project_name} </Text>
      <VerticalHeight height={Height * 0.05} />
      <Text
        onPress={() => nav.navigate('TeamMembers', {id: data._id})}
        style={styles.textStyle}>
        Team members
      </Text>
      <HorizontalLine size={Width * 0.85} />
      <Text
        onPress={() => nav.navigate('Reports', {id: data._id})}
        style={styles.textStyle}>
        Reports
      </Text>
      <HorizontalLine size={Width * 0.85} />
      <Text
        onPress={() =>
          nav.navigate('DailyWorkSchedule', {
            id: data._id,
            name: data.project_name,
          })
        }
        style={styles.textStyle}>
        Daily work schedule
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: AppColors.white1,
    fontSize: 24,
    paddingVertical: 10,
  },
});
