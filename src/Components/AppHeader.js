import {AppColors} from 'assets/AppColors';
import { AppFonts } from 'assets/fonts/AppFonts';
import {View, Text, Dimensions} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {GStyles} from './GlobalStyle';

export const AppHeader = ({
  leftText = 'Left',
  rightText = 'Signup',
  padding = 15,
  leftTextColor = AppColors.lightBlue,
  rightTextColor = AppColors.lightBlue,
  leftTextFontSize = 20,
  rightTextFontSize = 20,
  showLeft = true,
  showRight = true,
}) => {
  return (
    <View
      style={[
        GStyles.PosAbsTop,
        GStyles.FlexRowSpcaBetw,
        {width: Width, padding: padding},
      ]}>
      <View>
        {showLeft && (
          <Text style={{color: leftTextColor, fontSize: leftTextFontSize}}>
            {leftText}
          </Text>
        )}
      </View>
      <View>
        {showRight && (
          <Text style={{color: rightTextColor, fontSize: rightTextFontSize}}>
            {rightText}
          </Text>
        )}
      </View>
    </View>
  );
};

export const Width = Dimensions.get('screen').width;
export const Height = Dimensions.get('screen').height;

export const BottomButton = ({title = 'Done', disable = true}) => {
  return (
    <View style={[GStyles.PosAbsBottom, {width: Width}, GStyles.FlexRowCenter]}>
      <Ripple
        disabled={disable}
        style={[GStyles.Center,{
          width: Width * 0.88,
          height: 50,
          backgroundColor:disable? AppColors.disableRed:AppColors.Red,
          borderRadius:10,
          bottom:20
        }]}>
        <Text style={{color: AppColors.white,fontSize:23,fontWeight:"500"}}>{title}</Text>
      </Ripple>
    </View>
  );
};

export const AccentButton = ({
  onPress = () => {},
  title = 'Post',
  style = {},
  disabled = false,
}) => {
  return (
    <Ripple
      disabled={disabled}
      onPress={() => onPress()}
      style={{
        backgroundColor: disabled ? AppColors.LightGrey : AppColors.Red,
        paddingVertical: 5,
        paddingHorizontal: 16,
        borderRadius: 30,
        ...style,
        justifyContent:"center",
        alignItems:"center"
      }}
    >
      <Text
        style={{
          fontSize: FontSize.large,
          fontFamily: AppFonts.CalibriBold,
          color: AppColors.white,
          fontWeight:"900"
        }}
      >
        {title}
      </Text>
    </Ripple>
  );
};
