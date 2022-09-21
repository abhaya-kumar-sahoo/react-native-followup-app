import {StyleSheet, View, Text, FlatList, Image} from 'react-native';
import React from 'react';
import {
  AppButton,
  GStyles,
  HorizontalSpace,
  isIOS,
  VerticalHeight,
} from 'Components/GlobalStyle';
import {AppHeader, Height, Width} from 'Components/AppHeader';
import {AppColors} from 'assets/AppColors';
import { useNavigation } from '@react-navigation/native';

export const ProjectList = () => {
  const nav=useNavigation()
  return (
    <View style={GStyles.FlexPadding}>
      <AppHeader onPressRight={()=> nav.navigate('AddProjectName')} rightTextColor={AppColors.white1} rightText="+ New Project" />
      <VerticalHeight height={Height * 0.13} />
      <Text  style={GStyles.AuthTextStyle}>Projects list</Text>
      <VerticalHeight height={Height * 0.05} />
      <View style={{height: Height * 0.35}}>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
          ListHeaderComponent={<></>}
          keyExtractor={(i, k) => i}
          ItemSeparatorComponent={<VerticalHeight height={30} />}
          ListFooterComponent={
            <>
              <VerticalHeight height={Height * 0.2} />
            </>
          }
          renderItem={({item, key}) => (
            <View key={key} style={styles.ProjectContainer}>
              <Text style={styles.ProjectContainerText}>Memofac_App</Text>
              <VerticalHeight height={20} />
              <View style={GStyles.FlexRow}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].slice(0, 5).map((i, k) => {
                  return (
                    <Image
                      key={k}
                      style={{
                        borderRadius: 50,
                        height: 40,
                        width: 40,
                        backgroundColor: AppColors.DarkGray1,
                        borderWidth: 1,
                        borderColor: AppColors.DarkBG,
                        marginRight: -10,
                      }}
                    />
                  );
                })}
                <Text
                  style={{
                    color: AppColors.white2,
                    paddingTop: 20,
                    marginLeft: 5,
                  }}
                >
                  ...
                </Text>
              </View>
            </View>
          )}
        />
      </View>
      <VerticalHeight height={30} />
      <Text style={{color: AppColors.MediumGrey1}}>Requests (1)</Text>

      <View style={[styles.ProjectContainer, {marginTop: 20}]}>
        <Text style={styles.ProjectContainerText}>Team Motivation</Text>
        <VerticalHeight height={20} />
        <View style={GStyles.FlexRowSpcaBetw}>
          <AppButton width={isIOS?150:130} text="Accept" backgroundColor={AppColors.green1} />
          <AppButton width={isIOS?150:130} text="Reject" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ProjectContainer: {
    width: Width * 0.9,
    height: 110,
    borderRadius: 10,
    backgroundColor: AppColors.Dark,
    alignSelf: 'center',
    padding: 10,
  },
  ProjectContainerText: {color: AppColors.white1, fontSize: 22},
});
