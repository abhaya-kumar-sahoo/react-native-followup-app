import React, { useState } from 'react';
import {
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import { AppColors } from '../assets/AppColors';
import { AppFonts } from '../assets/fonts/AppFonts';
import { AppDimens, FontSize ,GStyles,HoriSpace, Spacing} from '../shared/Global.styles';
import { DownArrowIcon } from '../shared/Icon.Comp';

export const NextButton = ({
  onPress = () => {},
  disabled = true,
  title = 'Next',
  ActiveColor='white',
  InActiveColor='black'
}) => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 10,
        paddingHorizontal: 10,
        right: -10,
      }}
      disabled={disabled}
      onPress={() => {
        if (disabled) {
        } else onPress();
      }}
    >
      <Text
        style={{
          fontFamily: AppFonts.CalibriBold,
          color: disabled ?InActiveColor: ActiveColor  ,
          fontSize: FontSize.xlarge,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};


export const Container = ({
  padding = Spacing.large,
  
  children,
  style = {},
}) => {
  return (
    <View style={{ ...style, paddingHorizontal: padding }}>{children}</View>
  );
};


export const SelectableRadioButton=({
  data = [],
  initial = 0,
  onSelected,
  editable,
  horizontal = true,
  RightComponent = null,
  RightButtonOnPress = () => {},
  enableIcon = false,
  paddingHorizontal=20,
  ContainerWidth=120,
  buttonWidth=90
}) =>{
  // data -> for passing dropdown data
  // initial -> for
  const [value, setValue] = useState('');

  React.useEffect(() => {
    if (data.length > 0) setValue(data[initial].key);
  }, [data]);

  return (
    <View
      style={[
        horizontal ? GStyles.flexRow : GStyles.flexColumn,
        { backgroundColor: AppColors.Transparent },
      ]}
    >
      {data.map((res) => {
        return (
          <View
            style={[
              GStyles.flexRow,
              {
                paddingVertical: Spacing.large,
                marginLeft:-10,
                justifyContent:"center",
                alignItems:"center",width:ContainerWidth
              },
            ]}
            key={res.key}
          >
            <Pressable
              onPress={() => {
                if (editable) {
                  setValue(res.key);
                  onSelected(res);
                }
              }}
              style={[
                GStyles.containView,
                {
                  backgroundColor:
                    value === res.key
                      ? '#C4C0C0'
                      : '#707070',
                  
                  paddingVertical: 10,
                  paddingHorizontal:paddingHorizontal,
                  borderRadius: 30,
                  marginRight: 30,
                  width:buttonWidth
                },
              ]}
            >
              <Text
                style={{
                  // ...GStyles.radioText,
                  fontSize: FontSize.inputText,
                  fontFamily: AppFonts.CalibriBold,
                  color:value === res.key?'#524848':'#C4C0C0',
                }}
              >
                {res.text}
              </Text>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}


export const DropdownHeader = ({
  title = 'Header',
  RightContainer = () => null,
  onHeaderPress = () => {},
  fontStyles = null,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: AppColors.green,
      }}
    >
      <Ripple
        onPress={() => onHeaderPress()}
        rippleContainerBorderRadius={20}
        rippleFades={true}
        style={{
          width: AppDimens.width * 0.6,
          flexDirection: 'row',
          alignItems: 'center',
          paddingRight: 10,
          // backgroundColor: AppColors.Red,
        }}
      >
        <Text
          ellipsizeMode={'tail'}
          numberOfLines={1}
          style={
            fontStyles !== null
              ? fontStyles
              : {
                  fontSize: FontSize.x4large,
                  color: AppColors.white,
                  fontFamily: AppFonts.CalibriBold,
                }
          }
        >
          {title}
        </Text>
        <HoriSpace size={Spacing.large} />
        <DownArrowIcon size={13}  />
      </Ripple>
      <RightContainer />
    </View>
  );
};


