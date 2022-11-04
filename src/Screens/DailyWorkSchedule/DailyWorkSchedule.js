import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  GStyles,
  HorizontalLine,
  HorizontalSpace,
  VerticalHeight,
} from 'Components/GlobalStyle';
import {AppHeader, BottomButton, Height, Width} from 'Components/AppHeader';

import {AppColors} from 'assets/AppColors';

import Ripple from 'react-native-material-ripple';
import {useNavigation} from '@react-navigation/native';
import {
  BackArrowIcon,
  CalenderIcon,
  CalenderView,
  ChatIcon,
} from 'shared/Icon.Comp';
import {GetPostApi} from 'ApiLogic/ApiCall';
import {useDispatch, useSelector} from 'react-redux';
import {getPosts} from 'Redux/reducers/PostReducer/PostReducer';
import {MonthlyReportSkeleton} from 'shared/Skeletons';
import {ImgUrls} from 'assets/Image/ImgSrc';
export const Months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const DailyWorkSchedule = ({route}) => {
  const nav = useNavigation();
  const today = new Date();

  var date = parseInt(
    new Date().toJSON().slice(0, 10).replace('-', '').replace('-', ''),
  );
  var time = parseInt(
    `${today.getHours()}${today.getMinutes()}${today.getSeconds()}`,
  );
  const fullTime = {
    day: parseInt(date.toString().slice(6, 8)),
    month: parseInt(date.toString().slice(4, 6)),
    year: parseInt(date.toString().slice(0, 4)),
  };
  const {token, UserData} = useSelector(state => state.UserAuth);
  const {posts, loading} = useSelector(state => state.GetPostsReducer);
  const [Item, setItem] = useState(date);
  const [Time, setTime] = useState(fullTime);

  const dispatch = useDispatch();

  const mo = Item.toString().slice(4, 6);
  const month = parseInt(mo >= 10 ? mo : mo.replace('0', ''));
  const dates = parseInt(Item.toString().slice(6, 8));
  const year = parseInt(Item.toString().slice(2, 4));

  useEffect(() => {
    dispatch(getPosts(token, route.params.id, Time));
  }, [Item, Time]);
  return (
    <View style={GStyles.FlexPadding}>
      <VerticalHeight height={20} />
      <View style={GStyles.FlexRowSpcaBetw}>
        <Text onPress={() => nav.goBack()}>
          <BackArrowIcon />
        </Text>
        <View style={GStyles.FlexRow}>
          <Ripple
            onPress={() =>
              nav.navigate('Calender', {
                onReturn: item => {
                  setItem(item);
                  const temDate = {
                    month: parseInt(item.toString().slice(4, 6)),
                    day: parseInt(item.toString().slice(6, 8)),
                    year: parseInt(item.toString().slice(0, 4)),
                  };
                  setTime(temDate);
                },
              })
            }>
            <CalenderIcon size={30} />
          </Ripple>
          <HorizontalSpace size={20} />
          <Ripple
            onPress={() =>
              nav.navigate('ChatScreen', {
                name: route.params.name,
                _id: route.params.id,
              })
            }>
            <ChatIcon size={30} />
          </Ripple>
        </View>
      </View>
      <VerticalHeight height={30} />
      <View
        style={[
          GStyles.Center,
          {
            height: 300,
            width: Width * 0.85,
          },
        ]}>
        <View style={{left: 10}}>
          <CalenderView size={200} />
        </View>
        <View style={{position: 'absolute'}}>
          <Text style={styles.dataStyle}>{dates}</Text>
          <Text style={styles.monthStyle}>
            {Months[month - 1]}, {year}
          </Text>
        </View>
      </View>

      <View>
        <FlatList
          data={posts}
          onRefresh={() => {
            dispatch(getPosts(token, route.params.id, Time));
          }}
          refreshing={loading}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <>
              <Text style={{color: 'gray', alignSelf: 'center', marginTop: 40}}>
                No data available
              </Text>
            </>
          }
          ListHeaderComponent={<>{loading && <MonthlyReportSkeleton />}</>}
          keyExtractor={i => i._id}
          ListFooterComponent={<VerticalHeight height={Height * 0.9} />}
          renderItem={({item, index}) => (
            <View
              key={index}
              style={{
                width: Width,
              }}>
              <View style={GStyles.FlexRowCenterAlign}>
                <Image
                  source={
                    item.postedBy.image
                      ? {uri: item.postedBy.image}
                      : ImgUrls.DefaultIcon
                  }
                  style={GStyles.ImageCircleStyle}
                  resizeMethod="scale"
                  resizeMode="contain"
                />

                <HorizontalSpace />
                <Text style={{color: AppColors.white1, fontSize: 18}}>
                  {item.postedBy.name}
                </Text>
              </View>
              {item.project_comments.map((i, k) => {
                return (
                  <View key={k}>
                    <VerticalHeight height={20} />

                    <TouchableOpacity
                      onPress={() =>
                        nav.navigate('PostDetails', {
                          item: i,
                          user_id: item.postedBy._id,
                        })
                      }
                      style={GStyles.FlexRowCenterAlign}>
                      <View
                        style={{
                          backgroundColor: i.isCompleted
                            ? AppColors.green
                            : AppColors.Transparent,
                          width: 15,
                          height: 15,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: AppColors.green,
                        }}
                      />
                      <HorizontalSpace />
                      <Text style={{color: AppColors.white1, fontSize: 18}}>
                        {i.title}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}

              <VerticalHeight height={30} />
              <HorizontalLine
                height={40}
                alignSelf="center"
                size={Width * 0.8}
              />
            </View>
          )}
        />
      </View>
      <BottomButton
        onPress={() => nav.navigate('AddNotes', {id: route.params.id})}
        title="Add"
        disable={false}
      />
    </View>
  );
};

export default DailyWorkSchedule;

const styles = StyleSheet.create({
  monthStyle: {
    color: AppColors.white1,
    fontSize: 12,
    top: 40,
    left: 10,
  },
  dataStyle: {
    color: AppColors.white1,
    fontSize: 60,
    // right: 10,
    marginRight: 10,
  },
});
