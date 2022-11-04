import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {HeaderTextWithInputField, TextInputField} from '../components';
import {GStyles, VerticalHeight} from 'Components/GlobalStyle';
import {AppHeader, BottomButton, Height} from 'Components/AppHeader';
import {useNavigation} from '@react-navigation/native';
import {AppColors} from 'assets/AppColors';
import {request as requests} from 'ApiLogic/ApiCall';
import {APP_APIS} from 'ApiLogic/API_URL';
import {ImgUrls} from 'assets/Image/ImgSrc';
import * as ImagePickers from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import {Loader} from 'Components/Loader';
export const AddPhoto = ({route}) => {
  const {UserName, Password, CPassword} = route.params;
  const [response, setResponse] = useState('');
  const [ImageUri, setImageUri] = useState(null);
  const [ErrorText, setErrorText] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigation();

  const launchImageLibrary = async () => {
    try {
      if (Platform.OS === 'android') {
        check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
          .then(result => {
            switch (result) {
              case RESULTS.UNAVAILABLE:
                // console.log(
                //   'This feature is not available (on this device / in this context)',
                // );
                Alert.alert(
                  'Permission Alert',
                  'Requested functionality is not supported by your device.',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => console.log('ok boss')},
                  ],
                );
                break;
              case RESULTS.DENIED:
                // console.log(
                //   'The permission has not been requested / is denied but requestable',
                // );
                request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(
                  result => {
                    // …
                    console.log('WRITE PERMISSION GRANTED.', result);
                  },
                );
                break;
              case RESULTS.LIMITED:
                // console.log(
                //   'The permission is limited: some actions are possible',
                // );
                Alert.alert(
                  'Permission Alert',
                  'Due to system limitations few features are available on your device model.',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => console.log('ok boss')},
                  ],
                );
                break;
              case RESULTS.GRANTED:
                // console.log('The permission is granted');
                // Process Image Picker if permission is granted.
                let options = {
                  storageOptions: {
                    skipBackup: true,
                    path: 'images',
                  },
                };
                ImagePickers.launchImageLibrary(options, response => {
                  if (response.didCancel) {
                    console.log('User cancelled image picker');
                  } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                  } else if (response.customButton) {
                    console.log(
                      'User tapped custom button: ',
                      response.customButton,
                    );
                    Alert.alert(response.customButton);
                  } else {
                    // console.log(response.assets[0].fileName);
                    ImagePicker.openCropper({
                      path: response.assets[0].uri,
                      width: 400,
                      height: 400,
                      cropperCircleOverlay: true,
                      cropperToolbarTitle: 'Crop Photo',
                      cropperActiveWidgetColor: 'white',
                      cropperStatusBarColor: 'black',
                      cropperToolbarColor: 'black',
                      cropperToolbarWidgetColor: 'white',
                    }).then(image => {
                      setImageUri(image.path);
                    });
                  }
                });

                break;
              case RESULTS.BLOCKED:
                // console.log(
                //   'The permission is denied and not requestable anymore',
                // );
                // Request user to manually toggle on required permissions from app settings
                Alert.alert(
                  'Permission Alert',
                  'Storage Permission needed for selecting/capturing user profile photo, please grant permission from app settings.',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => openSettings()},
                  ],
                );
                break;
            }
          })
          .catch(error => {
            // …
            // console.log('some error while fetching permission :', error);
          });
      } else if (Platform.OS === 'ios') {
        check(PERMISSIONS.IOS.PHOTO_LIBRARY)
          .then(result => {
            switch (result) {
              case RESULTS.UNAVAILABLE:
                // console.log(
                //   'This feature is not available (on this device / in this context)',
                // );
                Alert.alert(
                  'Permission Alert',
                  'Requested functionality is not supported by your device.',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => console.log('ok boss')},
                  ],
                );
                break;
              case RESULTS.DENIED:
                // console.log(
                //   'The permission has not been requested / is denied but requestable',
                // );
                request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
                  // …
                  // console.log('PHOTO LIBRARY PERMISSION GRANTED.', result);
                });
                break;
              case RESULTS.LIMITED:
                // console.log(
                //   'The permission is limited: some actions are possible',
                // );
                Alert.alert(
                  'Permission Alert',
                  'Due to system limitations few features are available on your device model. Please enable the photo permissions from app settings.',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => openSettings()},
                  ],
                );
                break;
              case RESULTS.GRANTED:
                // console.log('The permission is granted');
                // Process Image Picker if permission is granted.
                let options = {
                  storageOptions: {
                    skipBackup: true,
                    path: 'images',
                  },
                };

                ImagePicker.openPicker({
                  width: 400,
                  height: 400,
                  cropping: true,
                  cropperCircleOverlay: true,
                  cropperToolbarTitle: 'Crop Photo',
                  cropperActiveWidgetColor: 'white',
                  cropperStatusBarColor: 'wite',
                  cropperToolbarColor: 'white',
                  cropperToolbarWidgetColor: 'white',
                }).then(image => {
                  setImageUri(image?.path);
                });

                break;
              case RESULTS.BLOCKED:
                // console.log(
                //   'The permission is denied and not requestable anymore',
                // );
                // Request user to manually toggle on required permissions from app settings
                Alert.alert(
                  'Permission Alert',
                  'Storage Permission needed for selecting/capturing user profile photo, please grant permission from app settings.',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => openSettings()},
                  ],
                );
                break;
            }
          })
          .catch(error => {
            // …
            // console.log('some error while fetching permission :', error);
          });
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const Registration = async () => {
    setLoading(true);
    setErrorText('');

    try {
      if (Password === CPassword) {
        const formData = new FormData();
        formData.append('name', UserName);
        formData.append('password', Password);
        formData.append('cPassword', CPassword);
        // formData.append('image', {uri: ImageUri});
        if (ImageUri) {
          formData.append('image', {
            uri: ImageUri,
            type: 'image/jpeg' || 'image/jpg' || 'image/png',
            name: UserName,
          });
        }

        // console.log(formData._parts);
        await requests({
          url: APP_APIS.REGISTER,
          body: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(result => {
            setLoading(false);
            if (result.error) {
              setErrorText(result.msg);
            } else {
              nav.navigate('LoginScreen');
            }
          })
          .catch(e => {
            console.log('err', e);
            setLoading(false);
          });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <View style={GStyles.FlexPadding}>
      <AppHeader
        rightText="4/4"
        rightTextFontSize={18}
        rightTextColor={AppColors.white1}
        showLeft={false}
        // enableBack={true}
      />
      <Loader text="Adding Account ..." visible={loading} />
      <VerticalHeight height={Height * 0.15} />
      <View style={{}}>
        <Text style={GStyles.AuthTextStyle}>Add</Text>
        <VerticalHeight />
        <Text style={GStyles.AuthTextStyle}>Profile pic</Text>
      </View>

      <VerticalHeight height={30} />

      <View style={GStyles.Center}>
        <TouchableOpacity
          onPress={() => {
            launchImageLibrary();
          }}>
          <Image
            source={ImageUri === null ? ImgUrls.DefaultIcon : {uri: ImageUri}}
            resizeMode="contain"
            resizeMethod="scale"
            style={{width: 150, height: 150, borderRadius: 100}}
          />
        </TouchableOpacity>
      </View>

      <BottomButton
        onPress={() => {
          Registration();
        }}
        title="Register"
        disable={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
