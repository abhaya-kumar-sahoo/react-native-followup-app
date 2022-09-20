import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { RootNav } from './src/RootNav/RootNav'
import { Provider as PaperProvider } from 'react-native-paper';
import { LoginScreen } from 'Screens/Authentication/LoginScreen';
import { GStyles } from 'Components/GlobalStyle';

export const App = () => {
  return (
   <SafeAreaView style={GStyles.Flex} >

<LoginScreen/>
   </SafeAreaView>
   
  )
}


const styles = StyleSheet.create({})
