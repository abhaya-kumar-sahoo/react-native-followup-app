import {AppColors} from 'assets/AppColors';
import {StyleSheet, View} from 'react-native';
import { Width } from './AppHeader';

export const GStyles = StyleSheet.create({
  Flex: {
    flex: 1,
    backgroundColor: AppColors.DarkBG,
  },
  FlexRow: {
    flexDirection: 'row',
  },
  FlexColumn: {
    flexDirection: 'column',
  },
  FlexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  FlexColumnCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  FlexRowSpcaBetw: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Center: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  PosAbsTop: {
    position: 'absolute',
    top: 10,
  },
  PosAbsBottom: {
    position: 'absolute',
    bottom: 10,
  },
});


export const VerticalHeight=({height=10})=>{
  return(
    <View style={{height:height}} />
  )
}