import * as ImagePickers from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import {Alert, Platform} from 'react-native';

export const launchImageLibrary = async () => {
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
                    return image.path;
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
                // setImageUri(image?.path);
                return image.path;
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
