import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AppButton,
  GStyles,
  HorizontalSpace,
  isIOS,
  VerticalHeight,
} from 'Components/GlobalStyle';
import {AppHeader, Height, Width} from 'Components/AppHeader';
import {AppColors} from 'assets/AppColors';
import {useNavigation} from '@react-navigation/native';
import {Loader} from 'Components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';

import {
  RestoreToken,
  saveProgress,
} from 'Redux/reducers/Authentication/AuthReducer';
import {getAllProjects} from 'Redux/reducers/Projects/ProjectsReducer';
import {request} from 'ApiLogic/ApiCall';
import {APP_APIS} from 'ApiLogic/API_URL';
import {ProjectsSkeleton} from 'shared/Skeletons';

export const ProjectList = () => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const {token, UserData} = useSelector(state => state.UserAuth);
  const {posts, loading} = useSelector(state => state.ProjectReducer);
  const [Notifications, setNotifications] = useState([]);
  const [accept, setAccept] = useState(true);
  useEffect(() => {
    dispatch(getAllProjects({data: token}));
    request({url: APP_APIS.PROJECT_REQUESTS, body: JSON.stringify({token})})
      .then(res => {
        setNotifications(res.notifications);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const ResponseCall = (accept, users, projectId) => {
    var id;
    users.map(i => {
      if (i.user._id === UserData._id) {
        id = i._id;
        console.log(i.user);
      }
    });

    request({
      url: APP_APIS.REQUEST_ACCEPT,
      body: JSON.stringify({token, id, accept, id}),
      type: 'PUT',
    })
      .then(res => {
        if (!res.error) {
          let newNotification = [...Notifications];
          let data = newNotification.filter(r => r._id !== projectId);
          setNotifications(data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <View style={GStyles.FlexPadding}>
      <AppHeader
        onPressRight={() => nav.navigate('AddProjectName')}
        rightTextColor={AppColors.white1}
        rightText="+ New Project"
      />
      <VerticalHeight height={Height * 0.13} />
      <Text
        onPress={() => {
          AsyncStorage.clear(),
            dispatch(
              RestoreToken(null),
              dispatch(saveProgress({proceedStatus: 'login'})),
            );
        }}
        style={GStyles.AuthTextStyle}>
        Projects list
      </Text>
      <VerticalHeight height={Height * 0.05} />
      <View style={{height: Height * 0.4}}>
        <FlatList
          data={posts}
          onRefresh={() => {
            dispatch(getAllProjects({data: token}));
          }}
          refreshing={loading}
          showsVerticalScrollIndicator={false}
          keyExtractor={(i, index) => index}
          ItemSeparatorComponent={<VerticalHeight height={30} />}
          ListHeaderComponent={<>{loading && <ProjectsSkeleton />}</>}
          ListEmptyComponent={
            <>
              <Text style={{color: 'gray', alignSelf: 'center', marginTop: 40}}>
                No data available
              </Text>
            </>
          }
          ListFooterComponent={
            <>
              <VerticalHeight height={Height * 0.2} />
            </>
          }
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => nav.navigate('ProjectDetails', {data: item})}
              key={index}
              style={styles.ProjectContainer}>
              <Text style={styles.ProjectContainerText}>
                {item.project_name}
              </Text>
              <VerticalHeight height={20} />
              <View style={GStyles.FlexRow}>
                {item.users.slice(0, 5).map((i, k) => {
                  return (
                    <View
                      key={k}
                      style={{
                        borderRadius: 50,
                        height: 40,
                        width: 40,
                        backgroundColor: AppColors.DarkGray1,
                        borderWidth: 1,
                        borderColor: AppColors.DarkBG,
                        marginRight: -10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: AppColors.green}}>
                        {i.user.name.slice(0, 2)}
                      </Text>
                    </View>
                  );
                })}
                {item.users.length > 4 && (
                  <Text
                    style={{
                      color: AppColors.white2,
                      paddingTop: 20,
                      marginLeft: 5,
                    }}>
                    ...
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <VerticalHeight height={30} />
      <View
        style={{
          position: 'absolute',
          bottom: Height * 0.08,
          alignSelf: 'center',
          width: Width,
          paddingLeft: 20,
        }}>
        <Text
          style={{
            color: AppColors.MediumGrey1,
            alignSelf: 'flex-start',
            textAlign: 'left',
          }}>
          Requests ({Notifications.length})
        </Text>
        <VerticalHeight />
        <ScrollView
          ItemSeparatorComponent={() => (
            <>
              <HorizontalSpace />
              <View style={{width: 100, height: 100}} />
            </>
          )}
          horizontal={true}>
          {Notifications.map((i, k) => {
            return (
              <View key={k} style={[styles.ProjectContainer, {}]}>
                <Text style={styles.ProjectContainerText}>
                  {i.project_name}
                </Text>
                <VerticalHeight height={20} />
                <View style={GStyles.FlexRowSpcaBetw}>
                  <AppButton
                    width={isIOS ? 150 : 130}
                    text="Accept"
                    backgroundColor={AppColors.green1}
                    onPress={() => ResponseCall(true, i.users, i._id)}
                  />
                  <AppButton
                    width={isIOS ? 150 : 130}
                    text="Reject"
                    onPress={() => ResponseCall(false, i.users, i._id)}
                  />
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ProjectContainer: {
    width: Width * 0.85,
    height: 110,
    borderRadius: 10,
    backgroundColor: AppColors.Dark,
    alignSelf: 'center',
    padding: 10,
    marginRight: 20,
  },
  ProjectContainerText: {color: AppColors.white1, fontSize: 22},
});
