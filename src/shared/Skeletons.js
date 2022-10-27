import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Width} from 'Components/AppHeader';
import {AppColors} from 'assets/AppColors';
import {VerticalHeight} from 'Components/GlobalStyle';

export const ProjectsSkeleton = ({component}) => {
  return (
    <>
      {[0, 1, 1].map((r, k) => {
        return (
          <View key={k} style={{marginVertical: 10}}>
            <SkeletonPlaceholder
              backgroundColor={AppColors.SkeletonColor}
              highlightColor={AppColors.SkeletonHighlight}
              borderRadius={4}>
              <SkeletonPlaceholder.Item
                width={Width * 0.9}
                height={110}
                borderRadius={5}
              />
            </SkeletonPlaceholder>

            {component}
          </View>
        );
      })}
    </>
  );
};

export const UserListSkeleton = () => {
  return (
    <>
      {[0, 1, 3, 4, 4, 5, 5, 5, 5, 5].map((r, k) => {
        return (
          <View key={k} style={{marginVertical: 10, alignSelf: 'center'}}>
            <SkeletonPlaceholder
              backgroundColor={AppColors.SkeletonColor}
              highlightColor={AppColors.SkeletonHighlight}
              borderRadius={4}>
              <SkeletonPlaceholder.Item
                width={Width * 0.9}
                height={50}
                borderRadius={5}
              />
            </SkeletonPlaceholder>
          </View>
        );
      })}
    </>
  );
};

export const MonthlyReportSkeleton = () => {
  return (
    <>
      {[0, 1, 3, 4, 4, 5, 5, 5, 5, 5].map((r, k) => {
        return (
          <View key={k} style={{marginVertical: 10, alignSelf: 'center'}}>
            <SkeletonPlaceholder
              backgroundColor={AppColors.SkeletonColor}
              highlightColor={AppColors.SkeletonHighlight}
              borderRadius={4}>
              <SkeletonPlaceholder.Item
                width={Width * 0.9}
                height={100}
                flexDirection="row"
                alignItems="center"
                borderRadius={5}>
                <SkeletonPlaceholder.Item
                  width={70}
                  height={70}
                  borderRadius={50}
                />
                <SkeletonPlaceholder.Item
                  marginLeft={10}
                  width={90}
                  height={20}
                  borderRadius={5}
                />
              </SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item marginTop={30}>
                <SkeletonPlaceholder.Item width={Width * 0.8} height={10} />
                <SkeletonPlaceholder.Item
                  width={Width * 0.5}
                  marginTop={10}
                  height={10}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          </View>
        );
      })}
    </>
  );
};
