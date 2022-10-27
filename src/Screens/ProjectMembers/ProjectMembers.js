import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppButton, GStyles, VerticalHeight} from 'Components/GlobalStyle';
import {AppHeader, BottomButton, Height, Width} from 'Components/AppHeader';
import {AppColors} from 'assets/AppColors';
import {useNavigation} from '@react-navigation/native';
import {request, GetProjectMembers} from 'ApiLogic/ApiCall';
import {APP_APIS} from 'ApiLogic/API_URL';
import {useSelector} from 'react-redux';
import {UserListSkeleton} from 'shared/Skeletons';

export const TeamMembers = ({route}) => {
  const {navigate} = useNavigation();
  const [Users, setUsers] = useState([]);
  const [UsersLoading, setUsersLoading] = useState(true);

  const {token, UserData} = useSelector(state => state.UserAuth);

  let ProjectMembers = new Array();

  const GetProjectMember = () => {
    setUsersLoading(true);

    GetProjectMembers(route.params.id)
      .then(res => {
        setUsers(res.users);
        setUsersLoading(false);
      })
      .catch(err => {
        console.log(err);
        setUsersLoading(false);
      });
  };
  useEffect(() => {
    GetProjectMember();
  }, []);

  const AddUser = () => {
    Users.map(res => {
      ProjectMembers.push(res.user._id);
    });
    // console.log('ProjectMembers', ProjectMembers);

    navigate('RequestMembers', {
      existingUsers: ProjectMembers,
      id: route.params.id,
    });
  };

  // console.log(ProjectMembers);

  return (
    <View style={GStyles.FlexPadding}>
      <AppHeader enableBack={true} showRight={false} />
      <VerticalHeight height={Height * 0.1} />
      <Text style={GStyles.AuthTextStyle}>Team members</Text>
      <VerticalHeight height={25} />
      <View style={{height: Height * 0.6}}>
        <FlatList
          data={Users}
          onRefresh={() => {
            GetProjectMember();
          }}
          refreshing={UsersLoading}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <>
              <Text style={{color: 'gray', alignSelf: 'center', marginTop: 40}}>
                No data available
              </Text>
            </>
          }
          ListFooterComponent={<VerticalHeight height={100} />}
          ListHeaderComponent={<>{UsersLoading && <UserListSkeleton />}</>}
          renderItem={({item, index}) => (
            <View style={[GStyles.FlexRowSpcaBetw, {height: 60}]} key={index}>
              <View style={GStyles.FlexRowCenterAlign}>
                <View style={GStyles.ImageCircleStyle}>
                  <Text style={{color: AppColors.green, fontSize: 20}}>
                    {item.user.name.slice(0, 1)}
                  </Text>
                </View>
                <Text style={styles.textStyle}>{item.user.name}</Text>
              </View>
              <Text style={styles.textRequest}>
                {item.isAdmin ? 'Admin' : item.accepted ? '' : 'Requested'}
              </Text>
            </View>
          )}
        />
      </View>

      <BottomButton disable={false} title="Add" onPress={AddUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: AppColors.white1,
    fontSize: 20,
    paddingLeft: 10,
  },
  textRequest: {
    color: AppColors.MediumGrey1,
  },
});
