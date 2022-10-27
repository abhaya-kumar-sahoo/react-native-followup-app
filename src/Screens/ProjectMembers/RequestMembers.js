import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  AppButton,
  GStyles,
  HorizontalSpace,
  VerticalHeight,
} from 'Components/GlobalStyle';
import {BottomButton, Height, Width} from 'Components/AppHeader';
import {TextInputField} from 'Screens/Authentication/components';
import {AppColors} from 'assets/AppColors';
import {AddMembersApi, request} from 'ApiLogic/ApiCall';
import {APP_APIS} from 'ApiLogic/API_URL';
import {getAllUser} from 'Redux/reducers/GetAllUserReducer/GetAllUser';
import {useDispatch, useSelector} from 'react-redux';
import {Loader} from 'Components/Loader';
import {useNavigation} from '@react-navigation/native';
import {UserListSkeleton} from 'shared/Skeletons';
export const RequestMembers = ({route}) => {
  const [Search, setSearch] = useState('');
  const {token} = useSelector(state => state.UserAuth);
  const {users, loading} = useSelector(state => state.GetAllUserReducer);
  const [SelectedUser, setSelectedUser] = useState([]);

  const [Users, setUsers] = useState([]);

  const [Request, setRequest] = useState(null);
  const [Loading, setLoading] = useState(false);
  const nav = useNavigation();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUser(token, route.params.existingUsers, Search));
  }, [Search]);
  useEffect(() => {
    setUsers(users);
  }, [users.length]);

  const newList = [...SelectedUser];

  const AddUsers = async (key, id, select) => {
    let list = [...Users];
    list.map((i, k) => {
      if (k === key) {
        i.selected = !select;
      }
    });
    setUsers(list);
    const isAvailable = SelectedUser.includes(id);
    // console.log(isAvailable);
    if (isAvailable) {
      let List = newList.filter(i => i !== id);
      // console.log('list', List);
      if (List.length == 0) {
        setSelectedUser([]);
      } else {
        setSelectedUser(List);
      }
    } else {
      newList.push(id);
      setSelectedUser(newList);
    }
  };

  const AddMembers = async () => {
    setLoading(true);

    const SelectedUsers = await SelectedUser.map(i => {
      return {user: i};
    });

    if (SelectedUsers.length > 0) {
      const data = {
        projectId: route.params.id,
        token,
        users: SelectedUsers,
      };

      AddMembersApi(data)
        .then(res => {
          setLoading(false);
          // dispatch(AddProjects({data: res.data}));
          nav.navigate('ProjectList');
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  return (
    <SafeAreaView style={GStyles.FlexPadding}>
      <VerticalHeight height={40} />
      <TextInput
        style={styles.textInput}
        value={Search}
        placeholder="Search users"
        placeholderTextColor={AppColors.MediumGrey1}
        onChangeText={e => setSearch(e)}
      />
      <VerticalHeight height={Height * 0.04} />

      <Loader text="Adding members" visible={Loading} />

      <View style={{height: Height * 0.7}}>
        <FlatList
          data={Users}
          refreshing={loading}
          onRefresh={() => {
            dispatch(getAllUser(token, route.params.existingUsers));
          }}
          ItemSeparatorComponent={<VerticalHeight height={20} />}
          ListFooterComponent={<VerticalHeight height={100} />}
          ListHeaderComponent={<>{loading && <UserListSkeleton />}</>}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <>
              <Text style={{color: 'gray', alignSelf: 'center', marginTop: 40}}>
                No data available
              </Text>
            </>
          }
          renderItem={({item, index}) => (
            <View key={index} style={[GStyles.FlexRowSpcaBetw]}>
              <View style={GStyles.FlexRowCenterAlign}>
                <View style={GStyles.ImageCircleStyle}>
                  <Text style={{color: AppColors.green, fontSize: 20}}>
                    {item.name.slice(0, 1)}
                  </Text>
                </View>
                <HorizontalSpace />
                <Text style={{color: AppColors.white1, fontSize: 18}}>
                  {item.name}
                </Text>
              </View>
              {item.selected ? (
                <Text
                  onPress={() => AddUsers(index, item._id, item.selected)}
                  style={styles.Requested}>
                  Requested
                </Text>
              ) : (
                <AppButton
                  width={65}
                  onPress={() => AddUsers(index, item._id, item.selected)}
                  height={30}
                  fontSize={13}
                  borderRadius={6}
                  text="Request"
                />
              )}
            </View>
          )}
        />
      </View>
      <BottomButton onPress={AddMembers} disable={false} title="Done" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: AppColors.MediumGrey1,
  },
  textInput: {
    borderBottomColor: AppColors.DarkGray1,
    borderBottomWidth: 1,
    color: AppColors.white1,
    fontSize: 22,
  },
  Requested: {
    color: AppColors.MediumGrey1,
    fontSize: 16,
  },
});
