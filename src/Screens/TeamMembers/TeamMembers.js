import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React, {useEffect} from 'react';
import {AppButton, GStyles, VerticalHeight} from 'Components/GlobalStyle';
import {AppHeader, BottomButton, Height, Width} from 'Components/AppHeader';
import {AppColors} from 'assets/AppColors';
import {useNavigation} from '@react-navigation/native';
import {request} from 'ApiLogic/ApiCall';
import {APP_APIS} from 'ApiLogic/API_URL';

export const TeamMembers = () => {
  const {navigate} = useNavigation();

  return (
    <View style={GStyles.FlexPadding}>
      <AppHeader enableBack={true} showRight={false} />
      <VerticalHeight height={Height * 0.15} />
      <Text style={GStyles.AuthTextStyle}>Add members</Text>

      <View style={{height: Height * 0.6}}>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]}
          renderItem={({item, key}) => (
            <View style={[GStyles.FlexRowSpcaBetw, {height: 60}]} key={key}>
              <View style={GStyles.FlexRowCenterAlign}>
                <Image style={GStyles.ImageCircleStyle} />
                <Text style={styles.textStyle}>Abhaya</Text>
              </View>
              <Text style={styles.textRequest}>
                {item === 1 ? 'Admin' : 'Requested'}
              </Text>
            </View>
          )}
        />
      </View>

      <BottomButton
        disable={false}
        title="Add"
        onPress={() => navigate('RequestMembers')}
      />
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
