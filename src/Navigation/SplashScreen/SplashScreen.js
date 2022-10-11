import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {GStyles} from 'Components/GlobalStyle';
import {ImgUrls} from 'assets/Image/ImgSrc';
import {useDispatch} from 'react-redux';
import {SplashLoading} from 'Redux/reducers/Authentication/AuthReducer';

export const SplashScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(SplashLoading({loading: true}));
    }, 2000);
  }, []);

  return (
    <View style={[GStyles.Flex, GStyles.Center]}>
      <Image
        source={ImgUrls.SplashImage}
        resizeMethod="auto"
        resizeMode="center"
      />
    </View>
  );
};
