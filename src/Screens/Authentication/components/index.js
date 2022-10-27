import {AppColors} from 'assets/AppColors';
import {AppFonts} from 'assets/fonts/AppFonts';
import {Height, Width} from 'Components/AppHeader';
import {GStyles, isIOS, VerticalHeight} from 'Components/GlobalStyle';
import {
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
} from 'react-native';
import DelayInput from 'react-native-debounce-input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';

export const TextInputField = ({
  headerText = 'Enter Username',
  value = '',
  onChangeText = () => {},
  placeholder = '',
  pla,
}) => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  return (
    <SafeAreaView style={{width: Width, paddingHorizontal: 20}}>
      <ScrollView keyboardShouldPersistTaps={'never'}>
        <KeyboardAwareScrollView>
          <KeyboardAvoidingView>
            <Text style={GStyles.AuthTextStyle}>{headerText}</Text>
            <VerticalHeight height={25} />
            <TextInput
              value={value}
              onChangeText={onChangeText}
              style={{
                width: Width * 0.8,
                height: 45,
                backgroundColor: AppColors.DarkGray1,
                borderRadius: 10,
                paddingLeft: 10,
                fontSize: 20,
                color: AppColors.white1,
              }}
              placeholder={placeholder}
              placeholderTextColor={AppColors.MediumGrey1}
            />
          </KeyboardAvoidingView>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export const HeaderTextWithInputField = ({
  MainText = '',
  SubText = '',
  onChangeText = () => {},
  value = '',
  placeholder = '',
  delay = 500,
  ErrorColor = AppColors.Red1,
  text = '',
  minLength = 3,
}) => {
  return (
    <View style={{paddingLeft: 20, width: Width}}>
      <Text style={GStyles.AuthTextStyle}>{MainText}</Text>
      <VerticalHeight />
      <Text style={GStyles.AuthTextStyle}>{SubText}</Text>
      <VerticalHeight height={isIOS ? 65 : 25} />
      <DelayInput
        delayTimeout={delay}
        minLength={minLength}
        style={{
          borderBottomColor: AppColors.MediumGrey1,
          borderBottomWidth: 1,
          color: AppColors.white1,
          fontSize: 22,
        }}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={AppColors.MediumGrey1}
        onChangeText={onChangeText}
      />
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
        {text === '' ? (
          <></>
        ) : (
          <>
            {text === 'Username available' ? (
              <Icon
                size={12}
                name="checkmark-done-circle"
                color={AppColors.green1}
              />
            ) : (
              <MIcon size={12} name="cancel" color={AppColors.Red} />
            )}
          </>
        )}

        <Text
          style={{
            color: ErrorColor,
            alignSelf: 'center',
            fontWeight: '500',
            paddingLeft: 5,
          }}>
          {text}
        </Text>
      </View>
    </View>
  );
};
