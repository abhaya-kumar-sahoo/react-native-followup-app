import {AppColors} from 'assets/AppColors';
import {AppFonts} from 'assets/fonts/AppFonts';
import {Height, Width} from 'Components/AppHeader';
import {VerticalHeight} from 'Components/GlobalStyle';
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

export const TextInputField = ({headerText = 'Enter Username'}) => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  return (
    <SafeAreaView style={{width: Width, paddingHorizontal: 20}}>
      <ScrollView keyboardShouldPersistTaps={'never'}>
        <KeyboardAwareScrollView>
        <KeyboardAvoidingView>

          <Text
            style={{
              color: AppColors.white1,
              fontSize: 26,
              //   fontFamily: AppFonts.CalibriLight,
            }}>
            {headerText}
          </Text>
          <VerticalHeight height={25} />
          <TextInput
            placeholder=""
            style={{
              width: Width * 0.8,
              height: 40,
              backgroundColor: AppColors.DarkGray1,
              borderRadius: 10,
            }}
          />
                  </KeyboardAvoidingView>

        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};
