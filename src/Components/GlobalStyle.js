import {AppColors} from 'assets/AppColors';
import {Platform, StyleSheet, View, Text} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {Width} from './AppHeader';

export const GStyles = StyleSheet.create({
  Flex: {
    flex: 1,
    backgroundColor: AppColors.DarkBG,
  },
  FlexPadding: {
    flex: 1,
    backgroundColor: AppColors.DarkBG,
    paddingHorizontal: 20,
  },
  FlexRow: {
    flexDirection: 'row',
  },
  FlexRowCenterAlign: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  FlexColumn: {
    flexDirection: 'column',
  },
  FlexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  FlexColumnCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  FlexRowSpcaBetw: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Center: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  PosAbsTop: {
    position: 'absolute',
    top: 10,
  },
  PosAbsBottom: {
    position: 'absolute',
    bottom: 10,
  },
  AuthTextStyle: {
    color: AppColors.white1,
    fontSize: 35,
    fontWeight: '700',
  },
});

export const VerticalHeight = ({height = 10}) => {
  return <View style={{height: height}} />;
};
export const HorizontalSpace = ({size = 10}) => {
  return <View style={{width: size}} />;
};

export const isIOS = Platform.OS === 'ios' ? true : false;
export const AppButton = ({
  text = '',
  onPress,
  width = 150,
  height = 45,
  backgroundColor = AppColors.Red1,
  borderRadius = 12,
  fontSize=18
}) => {
  return (
    <Ripple
      onPress={onPress}
      style={[
        GStyles.FlexRowCenter,
        {
          width: width,
          height: height,
          backgroundColor: backgroundColor,
          borderRadius: borderRadius,
        },
      ]}>
      <Text style={{color: AppColors.white, fontSize: fontSize, fontWeight: '600'}}>
        {text}
      </Text>
    </Ripple>
  );
};
