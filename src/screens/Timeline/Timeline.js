/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {LinearTextGradient} from 'react-native-text-gradient';
import {
  isAndroidPhotoPermission,
  isIOS,
  isIosPhotoPermission,
} from 'components/permission';
import {MaskedViewText} from 'components/MaskedViewText';
import {
  AppButton,
  GStyles,
  LinearGradientView,
  RoundImageBox,
} from 'components/GlobalStyle';
import {AppColors} from 'assets/colors/AppColors';
export const Timeline = () => {
  return (
    <LinearGradientView
      component={
        <>
          <View style={styles.leftBox1}>
            <AppButton
              onPress={() => {
                isIOS ? isIosPhotoPermission() : isAndroidPhotoPermission();
              }}
            />
          </View>

          {/* <AppButton
            onPress={() => {
              isIOS ? isIosPhotoPermission() : isAndroidPhotoPermission();
            }}
          
          {/* <LinearTextGradient
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              backgroundColor: 'transparent',
            }}
            locations={[0, 1]}
            useViewFrame={false}
            colors={['#380', '#0C5']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text>THIS IS TEXT GRADIENT </Text>
          </LinearTextGradient> */}
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: [GStyles.flexRowCenter, GStyles.flex],
  leftBox1: {
    minWidth: 100,
    minHeight: 40,
    borderRadius: 50,
    shadowColor: AppColors.white,
    shadowOffset: {width: 1, height: 5},
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    elevation: 20,
    backgroundColor: '#F8F8F8',
  },
});
