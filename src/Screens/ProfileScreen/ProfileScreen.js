import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {GStyles} from 'Components/GlobalStyle';
import {useDispatch, useSelector} from 'react-redux';
import {AppHeader, BottomButton, Height} from 'Components/AppHeader';
import Icon from 'react-native-vector-icons/AntDesign';
import {AppColors} from 'assets/AppColors';
import {ImgUrls} from 'assets/Image/ImgSrc';
import {
  RestoreToken,
  saveProgress,
} from 'Redux/reducers/Authentication/AuthReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePickers from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import storage from '@react-native-firebase/storage';
import firebase from '@react-native-firebase/app';

export const ProfileScreen = () => {
  const {token, UserData} = useSelector(state => state.UserAuth);
  const dispatch = useDispatch();
  const [ImageUri, setImageUri] = useState(UserData.image);
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
                  // setImageUri(image?.path);
                  console.log(image.path);
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

  const UpdateImage = async () => {
    const reference = storage().ref(new Date().toString());

    // const data = await reference.putFile(ImageUri).then(res => {
    //   return res.metadata.name;
    // });

    // const url = await storage().ref(data).getDownloadURL();
    let u =
      'https://firebasestorage.googleapis.com/v0/b/followup-c94e1.appspot.com/o/Mon%20Oct%2031%202022%2011%3A37%3A31%20GMT%2B0530?alt=media&token=3c524ad0-ab6d-4885-b83f-b107ccd9e72f';

    var desertRef = firebase.storage().child(u);

    // Delete the file
    desertRef
      .delete()
      .then(function () {
        // File deleted successfully
        console.log('gg');
      })
      .catch(function (error) {
        console.log('ff');
      });
  };

  return (
    <View style={[GStyles.FlexPadding]}>
      <AppHeader
        enableBack={true}
        rightText={
          <Icon
            name="logout"
            color={AppColors.white1}
            size={25}
            onPress={() => {
              AsyncStorage.clear(),
                dispatch(
                  RestoreToken(null),
                  dispatch(saveProgress({proceedStatus: 'login'})),
                );
            }}
          />
        }
      />
      <View style={[GStyles.FlexColumnCenter, {marginTop: Height * 0.2}]}>
        {/* <TouchableOpacity onPress={() => launchImageLibrary()}> */}
        <Image
          source={ImageUri === null ? ImgUrls.DefaultIcon : {uri: ImageUri}}
          resizeMode="contain"
          resizeMethod="scale"
          style={{width: 200, height: 200, borderRadius: 100}}
        />
        {/* </TouchableOpacity> */}

        <View style={{marginTop: 30}}>
          <Text style={{color: AppColors.white1, fontSize: 22}}>
            {UserData.name}
          </Text>
        </View>
      </View>
      {/* <BottomButton
        disable={false}
        title="Update"
        onPress={() => UploadImage()}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({});
