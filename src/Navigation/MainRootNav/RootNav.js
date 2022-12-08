// In App.js in a new project
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UserStack} from 'navigation/UserStack/UserStack';

export const RootNav = () => {
  const Stack = createNativeStackNavigator();
  // const {token, proceedStatus, loading, SplashLoading} = useSelector(
  //   state => state.UserAuth,
  // );
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   AsyncStorage.getItem('token')
  //     .then(res => {
  //       dispatch(RestoreToken(res));
  //       // console.log(res);
  //       dispatch(getUserDetails(res));
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  //   AsyncStorage.getItem('proceedStatus')
  //     .then(res => {
  //       dispatch(saveProgress({proceedStatus: res}));
  //       // console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* {!SplashLoading ? (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        ) : (
          <>
            {token === null ? (
              <Stack.Screen
                name="RegistrationStack"
                children={RegistrationStack}
              />
            ) : (
              <Stack.Screen name="UserStack" children={UserStack} />
            )}
          </>
        )} */}
        <Stack.Screen name="UserStack" children={UserStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
