import {StyleSheet, Text, View, TextInput, FlatList, Image} from 'react-native';
import React, {useState} from 'react';
import {
  AppButton,
  GStyles,
  HorizontalSpace,
  VerticalHeight,
} from 'Components/GlobalStyle';
import {BottomButton, Height, Width} from 'Components/AppHeader';
import {TextInputField} from 'Screens/Authentication/components';
import {AppColors} from 'assets/AppColors';

export const RequestMembers = () => {
  const [Search, setSearch] = useState('');
  const [Request, setRequest] = useState(null);

  return (
    <View style={GStyles.FlexPadding}>
      <TextInput
        style={{
          borderBottomColor: AppColors.DarkGray1,
          borderBottomWidth: 1,
          color: AppColors.white1,
          fontSize: 22,
        }}
        value={Search}
        placeholder="Search users"
        placeholderTextColor={AppColors.MediumGrey1}
        onChangeText={e => setSearch(e)}
      />
      <VerticalHeight height={Height * 0.02} />
      <View style={{height: Height * 0.7}}>
        <FlatList
          data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]}
          ItemSeparatorComponent={<VerticalHeight height={20} />}
          ListFooterComponent={<VerticalHeight height={100} />}
          renderItem={({item, key}) => (
            <View style={[GStyles.FlexRowSpcaBetw]}>
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
                  Udit
                </Text>
              </View>
              {Request === item ? (
                <Text style={{color: AppColors.MediumGrey1, fontSize: 13}}>
                  Requested
                </Text>
              ) : (
                <AppButton
                  onPress={() => setRequest(item)}
                  width={65}
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
      <BottomButton disable={false} title="Done" />
    </View>
  );
};

const styles = StyleSheet.create({});
