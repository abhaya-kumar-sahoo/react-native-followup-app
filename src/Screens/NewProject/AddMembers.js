import {FlatList, StyleSheet, Text, View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {AppHeader, BottomButton, Height, Width} from 'Components/AppHeader';
import {
  AppButton,
  GStyles,
  HorizontalSpace,
  VerticalHeight,
} from 'Components/GlobalStyle';
import {HeaderTextWithInputField} from 'Screens/Authentication/components';
import {useNavigation} from '@react-navigation/native';
import {AppColors} from 'assets/AppColors';
import {request} from 'ApiLogic/ApiCall';
import {APP_APIS} from 'ApiLogic/API_URL';
import {useDispatch, useSelector} from 'react-redux';
import {AddProjectApiCall} from 'Redux/sagas/Projects/request';
import {AddProjects} from 'Redux/reducers/Projects/ProjectsReducer';
import {Loader} from 'Components/Loader';

export const AddMembers = ({route}) => {
  const [Name, setName] = useState('');
  const [Users, setUsers] = useState([]);
  const [isSelected, setIsSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [SelectedUser, setSelectedUser] = useState([]);

  const {token, UserData} = useSelector(state => state.UserAuth);
  const nav = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    request({
      url: APP_APIS.ALL_USERS,
    })
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

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
  // console.log('out', SelectedUser);
  const CreateProject = async () => {
    setLoading(true);

    const SelectedUsers = await SelectedUser.map(i => {
      return {user: i};
    });

    if (SelectedUsers.length > 0) {
      const data = {
        project_name: route.params.name,
        token,
        users: SelectedUsers,
      };
      AddProjectApiCall(data)
        .then(res => {
          setLoading(false);
          dispatch(AddProjects({data: res.data}));
          nav.navigate('ProjectList');
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  return (
    <View style={GStyles.Flex}>
      <AppHeader
        enableBack={true}
        rightText="2/2"
        rightTextColor={AppColors.white}
        rightTextFontSize={18}
      />
      <VerticalHeight height={Height * 0.15} />
      <Loader text="Posting .." visible={loading} />
      <HeaderTextWithInputField
        value={Name}
        onChangeText={e => setName(e)}
        MainText="Add"
        SubText="Members"
        placeholder="Search users"
      />
      <VerticalHeight height={40} />
      <View style={{height: Height * 0.3}}>
        <FlatList
          data={Users}
          ItemSeparatorComponent={<VerticalHeight height={20} />}
          renderItem={({item, index}) => (
            <View
              key={index}
              style={[
                GStyles.FlexRowSpcaBetw,
                {width: Width, paddingHorizontal: 20},
              ]}>
              <View style={GStyles.FlexRowCenterAlign}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    backgroundColor: AppColors.MediumGrey1,
                  }}
                />
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

      <BottomButton
        onPress={() => CreateProject()}
        disable={false}
        title="Done"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Requested: {
    color: AppColors.MediumGrey1,
    fontSize: 16,
  },
});
