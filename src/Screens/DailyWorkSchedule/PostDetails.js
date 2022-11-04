import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {AppButton, GStyles, VerticalHeight} from 'Components/GlobalStyle';
import {AppColors} from 'assets/AppColors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppHeader, BottomButton, Width} from 'Components/AppHeader';
import {useNavigation} from '@react-navigation/native';
import {request} from 'ApiLogic/ApiCall';
import {APP_APIS} from 'ApiLogic/API_URL';
import {useDispatch, useSelector} from 'react-redux';
import {updatePosts} from 'Redux/reducers/PostReducer/PostReducer';
import Ripple from 'react-native-material-ripple';
import {Loader} from 'Components/Loader';

export const PostDetails = ({route}) => {
  const {item, user_id} = route.params;

  const [Topic, setTopic] = useState(item.title);
  const [Notes, setNotes] = useState(item.description);
  const [Completed, setCompleted] = useState(item.isCompleted);
  const [Visible, setVisible] = useState(false);

  const {token, UserData} = useSelector(state => state.UserAuth);
  const dispatch = useDispatch();
  const nav = useNavigation();
  const AppPosts = async () => {
    setVisible(true);
    const data = {
      token,
      title: Topic,
      description: Notes,
      comment_id: item._id,
      user_id: UserData._id,
      isCompleted: Completed,
    };
    request({
      url: APP_APIS.UPDATE_COMMENTS,
      body: JSON.stringify(data),
    })
      .then(res => {
        setVisible(false);

        if (!res.error) {
          dispatch(updatePosts({data: res.data[0], isComment: true}));
        }

        nav.goBack();
      })
      .catch(err => {
        console.log(err);
        setVisible(false);
      });
  };
  const isDisable =
    Completed !== item.isCompleted ||
    Topic !== item.title ||
    Notes !== item.description;
  return (
    <SafeAreaView style={[GStyles.Flex, {padding: 30}]}>
      <AppHeader
        enableBack={true}
        showRight={true}
        rightText={
          <Ripple
            disabled={!isDisable}
            onPress={() => AppPosts()}
            style={{
              width: 70,
              height: 35,
              borderRadius: 10,
              backgroundColor: isDisable ? AppColors.Red : AppColors.disableRed,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: AppColors.white, fontSize: 16}}>Update</Text>
          </Ripple>
        }
      />
      <VerticalHeight height={40} />
      <Loader text="Updating ..." visible={Visible} />
      <TextInput
        value={Topic}
        editable={user_id == UserData._id}
        onChangeText={e => setTopic(e)}
        style={{
          color: AppColors.white1,
          fontSize: 32,
          borderBottomWidth: 1,
          borderColor: AppColors.MediumGrey1,
          paddingBottom: 10,
          fontWeight: '700',
        }}
        placeholder="Enter topic"
        placeholderTextColor={AppColors.MediumGrey1}
      />
      <VerticalHeight height={30} />
      <TextInput
        value={Notes}
        editable={user_id == UserData._id}
        onChangeText={e => {
          setNotes(e);
        }}
        style={{
          color: AppColors.white1,
          fontSize: 20,
          fontWeight: '600',
        }}
        placeholder="Add notes"
        multiline
        placeholderTextColor={AppColors.MediumGrey1}
      />

      <View
        style={{
          position: 'absolute',
          bottom: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: Width,
          paddingHorizontal: 25,
        }}>
        <AppButton
          backgroundColor={!Completed ? AppColors.Red1 : AppColors.LightGrey}
          // disable={Completed}
          width={130}
          text="In progress"
          onPress={() => setCompleted(false)}
        />
        <AppButton
          backgroundColor={Completed ? AppColors.green1 : AppColors.LightGrey}
          width={130}
          text="Completed"
          onPress={() => setCompleted(true)}
        />
      </View>

      {/* <BottomButton
        disable={
          Topic.replace(' ', '').length === 0 || user_id !== UserData._id
            ? true
            : false
        }
        title="Completed"
        onPress={() => AppPosts()}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
