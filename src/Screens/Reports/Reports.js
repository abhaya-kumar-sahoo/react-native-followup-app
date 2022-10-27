import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {GStyles, VerticalHeight} from 'Components/GlobalStyle';
import {AppHeader, BottomButton, Height} from 'Components/AppHeader';
import {AppColors} from 'assets/AppColors';
import {useNavigation} from '@react-navigation/native';
import {request} from 'ApiLogic/ApiCall';
import {APP_APIS} from 'ApiLogic/API_URL';
import {useSelector} from 'react-redux';
import {Months} from 'Screens/DailyWorkSchedule/DailyWorkSchedule';
import {UserListSkeleton} from 'shared/Skeletons';

export const Reports = ({route}) => {
  const nav = useNavigation();

  const {token, UserData} = useSelector(state => state.UserAuth);
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const CovertTime = Item => {
    return `${Months[Item.month - 1]}, ${Item.year}`;
  };

  const RequestDates = () => {
    setLoading(true);
    request({
      url: APP_APIS.PROJECT_DATES,
      body: JSON.stringify({token, project_id: route.params.id}),
    })
      .then(res => {
        // console.log(res);
        const t = res.data.map(r => {
          return CovertTime(r);
        });

        const uniqueIds = [];

        const unique = t.filter(element => {
          const isDuplicate = uniqueIds.includes(element);

          if (!isDuplicate) {
            uniqueIds.push(element);

            return true;
          }

          return false;
        });
        if (unique.length > 0) {
          setData(unique);
          setLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    RequestDates();
  }, []);

  return (
    <View style={GStyles.FlexPadding}>
      <AppHeader enableBack={true} showRight={false} />
      <VerticalHeight height={Height * 0.1} />
      <Text style={GStyles.AuthTextStyle}>Reports</Text>
      <VerticalHeight height={20} />
      <FlatList
        data={Data}
        keyExtractor={item => item._id}
        onRefresh={() => {
          RequestDates();
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
        ListFooterComponent={<VerticalHeight height={100} />}
        ListHeaderComponent={<>{loading && <UserListSkeleton />}</>}
        renderItem={({item, index}) => (
          <View key={index} style={{height: 50}}>
            <Text
              onPress={() =>
                nav.navigate('MonthReport', {
                  date: item,
                  id: route.params.id,
                })
              }
              style={{color: AppColors.white1, fontSize: 22}}>
              {item}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
