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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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
                height: 40,
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
}) => {
  return (
    <View style={{paddingLeft: 20, width: Width}}>
      <Text style={GStyles.AuthTextStyle}>{MainText}</Text>
      <VerticalHeight />
      <Text style={GStyles.AuthTextStyle}>{SubText}</Text>
      <VerticalHeight height={isIOS ? 65 : 25} />
      <TextInput
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
    </View>
  );
};
