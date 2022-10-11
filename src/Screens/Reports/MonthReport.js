import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {GStyles, HorizontalLine, VerticalHeight} from 'Components/GlobalStyle';
import {AppHeader, Height, Width} from 'Components/AppHeader';
import {AppColors} from 'assets/AppColors';

export const MonthReport = () => {
  return (
    <View style={GStyles.FlexPadding}>
      <AppHeader enableBack={true} showRight={false} />
      <VerticalHeight height={Height * 0.15} />
      <View style={GStyles.FlexRowCenterAlign}>
        <Image style={styles.Image} />

        <Text style={styles.title}>Abhaya</Text>
      </View>
      <VerticalHeight height={30} />
      <View style={styles.containerDescription}>
        <Text style={styles.montTitle}>june 1</Text>
        <View style={[GStyles.FlexRowCenterAlign, {marginVertical: 5}]}>
          <View
            style={{
              backgroundColor: AppColors.green1,
              height: 12,
              width: 12,
              borderRadius: 10,
            }}
          />
          <Text style={styles.containerText}>Post in Instagram</Text>
        </View>

        <View style={[GStyles.FlexRowCenterAlign, {marginVertical: 5}]}>
          <View
            style={{
              //   backgroundColor: AppColors.green1,
              height: 12,
              width: 12,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: AppColors.MediumGrey1,
            }}
          />
          <Text style={styles.containerText}>Post in Instagram</Text>
        </View>
        <VerticalHeight height={30} />
        <HorizontalLine alignSelf="center" size={Width * 0.8} />
      </View>

      <View style={styles.containerDescription}>
        <Text style={styles.montTitle}>june 2</Text>
        <View style={[GStyles.FlexRowCenterAlign, {marginVertical: 5}]}>
          <View
            style={{
              backgroundColor: AppColors.green1,
              height: 12,
              width: 12,
              borderRadius: 10,
            }}
          />
          <Text style={styles.containerText}>Post in Instagram</Text>
        </View>

        <View style={[GStyles.FlexRowCenterAlign, {marginVertical: 5}]}>
          <View
            style={{
              //   backgroundColor: AppColors.green1,
              height: 12,
              width: 12,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: AppColors.MediumGrey1,
            }}
          />
          <Text style={styles.containerText}>Post in Instagram</Text>
        </View>
        <VerticalHeight height={30} />
        <HorizontalLine alignSelf="center" size={Width * 0.8} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: AppColors.MediumGrey1,
  },
  title: {
    color: AppColors.white1,
    fontSize: 25,
    paddingLeft: 20,
  },
  montTitle: {
    color: AppColors.white1,
    fontSize: 12,
    paddingBottom: 10,
  },
  containerDescription: {
    // marginTop: 30,
    paddingLeft: 4,
    marginBottom: 50,
  },
  containerText: {
    color: AppColors.white2,
    fontSize: 15,
    paddingLeft: 10,
  },
});
