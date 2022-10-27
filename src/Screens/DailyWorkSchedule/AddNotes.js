import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {GStyles, VerticalHeight} from 'Components/GlobalStyle';
import {AppColors} from 'assets/AppColors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppHeader, BottomButton} from 'Components/AppHeader';
import {useNavigation} from '@react-navigation/native';
import {request} from 'ApiLogic/ApiCall';
import {APP_APIS} from 'ApiLogic/API_URL';
import {useDispatch, useSelector} from 'react-redux';
import {updatePosts} from 'Redux/reducers/PostReducer/PostReducer';

export const AddNotes = ({route}) => {
  const [Topic, setTopic] = useState('');
  const [Notes, setNotes] = useState('');
  const {token} = useSelector(state => state.UserAuth);
  const dispatch = useDispatch();
  const nav = useNavigation();

  const AppPosts = async () => {
    const data = {
      token,
      project_comments: [
        {
          title: Topic,
          description: Notes,
        },
      ],
      project_id: route.params.id,
    };
    request({
      url: APP_APIS.ADD_POSTS,
      body: JSON.stringify(data),
    })
      .then(res => {
        // console.log('datas', res.data);
        dispatch(updatePosts({data: res.data, isComment: false}));
        nav.goBack();
      })
      .catch(err => {
        console.log('error', err);
      });
  };

  return (
    <SafeAreaView style={[GStyles.Flex, {padding: 30}]}>
      <AppHeader enableBack={true} showRight={false} />
      <VerticalHeight height={40} />
      <TextInput
        value={Topic}
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

      <BottomButton
        disable={Topic.replace(' ', '').length === 0 ? true : false}
        title="Post"
        onPress={() => AppPosts()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
