import {Alert, Platform} from 'react-native';
import {
  check,
  PERMISSIONS,
  RESULTS,
  request,
  openSettings,
} from 'react-native-permissions';

export const isIOS = Platform.OS === 'ios' ? true : false;
export const isIosPhotoPermission = () => {
  check(PERMISSIONS.IOS.PHOTO_LIBRARY)
    .then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
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
          return false;

        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable',
          );
          request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
            // …
            console.log('WRITE PERMISSION GRANTED.', result);
          });
          return false;

        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
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
          return false;

        case RESULTS.GRANTED:
          console.log('The permission is granted');
          return true;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
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
          return false;
      }
    })
    .catch(error => {
      console.log('Something went wrong in permission');
      return false;
    });
};
export const isAndroidPhotoPermission = () => {
  check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
    .then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
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
          return false;

        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable',
          );
          request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(result => {
            // …
            console.log('WRITE PERMISSION GRANTED.', result);
          });
          return false;

        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
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
          return false;

        case RESULTS.GRANTED:
          console.log('The permission is granted');
          return true;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
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
          return false;
      }
    })
    .catch(error => {
      console.log('Something went wrong in permission');
      return false;
    });
};
