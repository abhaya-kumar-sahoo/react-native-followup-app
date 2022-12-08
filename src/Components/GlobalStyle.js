/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {AppColors, LinearColors} from 'assets/colors/AppColors';
import {ImgUrls} from 'assets/Images/ImgSrc';
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const AppDimens = {
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
};
export const RoundImageBox = ({uri = null, SIZE = 50}) => {
  return (
    <View style={{width: SIZE, height: SIZE, borderRadius: SIZE * 2}}>
      <Image
        style={{width: SIZE, height: SIZE, borderRadius: SIZE * 2}}
        resizeMode="contain"
        resizeMethod="auto"
        source={uri ? {uri: uri} : ImgUrls.DefaultIcon}
      />
    </View>
  );
};

export const LinearGradientView = ({
  component,
  colors = LinearColors.Black,
}) => {
  return (
    <LinearGradient
      colors={colors}
      style={GStyles.fullFlexRowCenter}
      start={{x: 0, y: 0}}
      end={{x: 0.5, y: 1.2}}>
      {component}
    </LinearGradient>
  );
};

export const AppButton = ({
  text = 'Press',
  onPress = () => {},
  textSize = 20,
}) => {
  return (
    <LinearGradient
      colors={LinearColors.DarkRed}
      style={{
        borderRadius: 50,
      }}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          minWidth: 100,
          minHeight: 40,
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 40,
          paddingVertical: 10,
        }}>
        <Text
          style={{
            color: AppColors.white1,
            fontWeight: 'bold',
            fontSize: textSize,
          }}>
          {text}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export const GStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  flexHPad: {
    flex: 1,
    paddingHorizontal: 20,
  },
  flexVPad: {
    flex: 1,
    paddingVertical: 20,
  },
  alignRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alignColumnCenter: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  fullFlexRowCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  flexRowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexColumnCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexRowSpaceEven: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  flexRowSpaceAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  flexColumnSpaceBetween: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexColumnSpaceEven: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  flexColumnSpaceAround: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
