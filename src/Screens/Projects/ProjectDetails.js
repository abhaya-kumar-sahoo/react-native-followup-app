import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GStyles, HorizontalLine, VerticalHeight} from 'Components/GlobalStyle';
import {AppHeader, Height, Width} from 'Components/AppHeader';
import {AppColors} from 'assets/AppColors';
import {useNavigation} from '@react-navigation/native';

export const ProjectDetails = () => {
  const nav = useNavigation();
  return (
    <View style={GStyles.FlexPadding}>
      <AppHeader enableBack={true} showRight={false} />
      <VerticalHeight height={Height * 0.15} />
      <Text style={GStyles.AuthTextStyle}>Memofac_App</Text>
      <VerticalHeight height={Height * 0.05} />

      <Text
        onPress={() => nav.navigate('TeamMembers')}
        style={styles.textStyle}>
        Team members
      </Text>
      <HorizontalLine size={Width * 0.85} />
      <Text onPress={() => nav.navigate('Reports')} style={styles.textStyle}>
        Reports
      </Text>
      <HorizontalLine size={Width * 0.85} />

      <Text
        onPress={() => nav.navigate('DailyWorkSchedule')}
        style={styles.textStyle}>
        Daily work schedule
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: AppColors.white1,
    fontSize: 24,
    paddingVertical: 10,
  },
});
