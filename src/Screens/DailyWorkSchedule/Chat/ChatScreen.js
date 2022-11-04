import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import {GStyles, VerticalHeight} from 'Components/GlobalStyle';
import {AppHeader, Height, Width} from 'Components/AppHeader';
import {AppColors} from 'assets/AppColors';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {getChats, updateChats} from 'Redux/reducers/ChatReducer/ChatReducer';
import {AddChatApi} from 'ApiLogic/ApiCall';

export const ChatScreen = ({route}) => {
  const {_id, name} = route.params;
  const {token, UserData} = useSelector(state => state.UserAuth);
  const flatListRef = React.useRef(null);
  const {chats, loading} = useSelector(state => state.GetAllChatsReducer);
  const [Chats, setChats] = useState('');
  const dispatch = useDispatch();
  const colors = [
    AppColors.msgColor1,
    AppColors.msgColor2,
    AppColors.msgColor3,
    AppColors.msgColor4,
    AppColors.msgColor5,
    AppColors.msgColor6,
    AppColors.msgColor7,
    AppColors.msgColor8,
    AppColors.msgColor9,
    AppColors.msgColor10,
  ];
  const time = new Date();

  const onSetMessage = () => {
    AddChatApi(token, _id, Chats)
      .then(res => {
        dispatch(updateChats(token, res.data));
      })
      .catch(err => {
        console.log(err);
      });
    setChats('');
  };
  React.useLayoutEffect(() => {
    const interval = setInterval(() => {
      dispatch(getChats(token, _id));
    }, 2000);

    const timeout = setTimeout(() => {
      if (flatListRef.current && chats && chats.length > 0) {
        flatListRef.current.scrollToEnd({animated: true});
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [chats.length]);

  return (
    <View style={GStyles.FlexPadding}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          // marginVertical: 20,
          height: 80,
        }}>
        <Icon color={AppColors.white} name="arrow-back" size={22} />
        <Text style={{color: AppColors.white1, fontSize: 22, paddingLeft: 10}}>
          {name}
        </Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={chats}
        // initialScrollIndex={chats.length - 1}
        keyExtractor={(item, index) => index}
        ListFooterComponent={
          <>
            <VerticalHeight height={Height * 0.15} />
          </>
        }
        ItemSeparatorComponent={
          <>
            <VerticalHeight height={30} />
          </>
        }
        renderItem={({item, index}) => (
          <View style={{backgroundColor: AppColors.DarkBG}} key={index}>
            <View
              style={[
                styles.messageBox,
                {
                  alignSelf:
                    item?.postedBy?._id == UserData._id
                      ? 'flex-end'
                      : 'flex-start',
                },
              ]}>
              <Text
                style={{
                  color:
                    item?.postedBy?._id == UserData._id
                      ? AppColors.msgColor7
                      : AppColors.msgColor8,
                  paddingBottom: 10,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                {item.postedBy.name}
              </Text>
              <Text style={{color: AppColors.white}}>{item.text}</Text>
              <Text
                style={{
                  color: AppColors.white,
                  textAlign: 'right',
                  fontSize: 10,
                }}>{`${time.getHours()}:${time.getMinutes()}`}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.posCenter}>
        <TextInput
          placeholder="Write a comment ..."
          placeholderTextColor={AppColors.white1}
          value={Chats}
          onChangeText={e => setChats(e)}
          multiline
          style={{
            borderRadius: 10,
            width: Width * 0.68,
            minHeight: 50,
            maxHeight: 150,
            backgroundColor: AppColors.SkeletonColor,
            paddingHorizontal: 15,
            fontSize: 18,
            color: AppColors.white1,
          }}
        />
        <Ripple
          onPress={() => {
            onSetMessage();
          }}
          style={[
            GStyles.Center,
            {
              width: 60,
              height: 30,
              borderRadius: 5,
              backgroundColor: AppColors.Red1,
            },
          ]}>
          <Text style={{color: AppColors.white, fontWeight: '700'}}>Send</Text>
        </Ripple>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  posCenter: [
    GStyles.FlexRowSpcaBetw,
    {
      width: Width,
      paddingHorizontal: 15,
      backgroundColor: AppColors.DarkBG,
      minHeight: 80,
      position: 'absolute',
      bottom: 0,
    },
  ],
  messageBox: {
    maxWidth: Width * 0.76,
    minHeight: 50,
    minWidth: Width * 0.2,
    // backgroundColor: AppColors.SkeletonColor,
    backgroundColor: AppColors.DarkGray1,

    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
});
