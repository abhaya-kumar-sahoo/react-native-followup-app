import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GStyles, HorizontalLine, VerticalHeight} from 'Components/GlobalStyle';
import {AppHeader, Height, Width} from 'Components/AppHeader';
import {AppColors} from 'assets/AppColors';
import {GetMonthReport} from 'ApiLogic/ApiCall';
import {useSelector} from 'react-redux';
import {FullMonths} from 'Components';
import {MonthlyReportSkeleton} from 'shared/Skeletons';
import {ImgUrls} from 'assets/Image/ImgSrc';

export const MonthReport = ({route}) => {
  const {token, UserData} = useSelector(state => state.UserAuth);
  const {id, date} = route.params;
  const [loading, setLoading] = useState(true);

  const [Reports, setReports] = useState([]);
  const Months = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  };
  const GetReports = () => {
    setLoading(true);

    let a = route.params.date.split(',');
    let mo = parseInt(Months[a[0].trim()]);
    let ye = parseInt(a[1].trim());

    let date = {
      day: 1,
      month: mo,
      year: ye,
    };

    GetMonthReport(token, id, date)
      .then(async res => {
        let uniqueIds = [];

        let newdata = [];
        await res.data.map(async r => {
          const isDuplicate = uniqueIds.includes(r.postedBy._id);

          if (!isDuplicate) {
            uniqueIds.push(r.postedBy._id);

            const dummy = {
              _id: r._id,
              postedBy: {
                _id: r.postedBy._id,
                name: r.postedBy.name,
                image: r.postedBy.image,
              },
              project_comments: [
                {
                  _id: r.project_comments._id,
                  created_date: r.project_comments.created_date,
                  description: r.project_comments.description,
                  title: r.project_comments.title,
                },
              ],
              project_id: r.project_id,
            };
            newdata.push(dummy);
          } else {
            let index = newdata.findIndex(
              x => x.postedBy._id === r.postedBy._id,
            );
            let dummyComments = {
              _id: r.project_comments._id,
              created_date: r.project_comments.created_date,
              description: r.project_comments.description,
              title: r.project_comments.title,
            };

            newdata[index].project_comments.push(dummyComments);
          }
        });

        setReports(newdata);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    GetReports();
  }, []);

  return (
    <View style={GStyles.FlexPadding}>
      <AppHeader enableBack={true} showRight={false} />
      <VerticalHeight height={Height * 0.1} />
      <FlatList
        data={Reports}
        keyExtractor={(r, index) => index}
        onRefresh={() => {
          GetReports();
        }}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<VerticalHeight height={100} />}
        ListEmptyComponent={
          <>
            <Text style={{color: 'gray', alignSelf: 'center', marginTop: 40}}>
              No data available
            </Text>
          </>
        }
        ListHeaderComponent={<>{loading && <MonthlyReportSkeleton />}</>}
        renderItem={({item, index}) => (
          <View key={index}>
            <VerticalHeight height={30} />

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

              <Text style={styles.title}>{item.postedBy.name}</Text>
            </View>
            {item.project_comments.map((r, k) => {
              return (
                <View key={k}>
                  <VerticalHeight height={30} />
                  <View style={styles.containerDescription}>
                    <Text style={styles.montTitle}>
                      {FullMonths[r.created_date.month - 1]},
                      {r.created_date.day}
                    </Text>
                    <View
                      style={[GStyles.FlexRowCenterAlign, {marginVertical: 5}]}>
                      <View
                        style={{
                          backgroundColor: AppColors.green1,
                          height: 12,
                          width: 12,
                          borderRadius: 10,
                        }}
                      />
                      <Text style={styles.containerText}>{r.title}</Text>
                    </View>

                    {/* <VerticalHeight height={30} /> */}
                    {/* <HorizontalLine alignSelf="center" size={Width * 0.8} /> */}
                  </View>
                </View>
              );
            })}
          </View>
        )}
      />

      {/* <View style={styles.containerDescription}>
        <Text style={styles.montTitle}>june 2</Text>
        <View style={[GStyles.FlexRowCenterAlign, {marginVertical: 5}]}>
          <View
            style={{
              backgroundColor: AppColors.green1,
              height: 12,
              width: 12,
              borderRadius: 10,
            }}
          />
          <Text style={styles.containerText}>Post in Instagram</Text>
        </View>

        <View style={[GStyles.FlexRowCenterAlign, {marginVertical: 5}]}>
          <View
            style={{
              //   backgroundColor: AppColors.green1,
              height: 12,
              width: 12,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: AppColors.MediumGrey1,
            }}
          />
          <Text style={styles.containerText}>Post in Instagram</Text>
        </View>
        <VerticalHeight height={30} />
        <HorizontalLine alignSelf="center" size={Width * 0.8} />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  Image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: AppColors.MediumGrey1,
  },
  title: {
    color: AppColors.white1,
    fontSize: 25,
    paddingLeft: 20,
  },
  montTitle: {
    color: AppColors.white1,
    fontSize: 12,
    paddingBottom: 10,
  },
  containerDescription: {
    // marginTop: 30,
    paddingLeft: 4,
    // marginBottom: 50,
  },
  containerText: {
    color: AppColors.white2,
    fontSize: 15,
    paddingLeft: 10,
  },
});
