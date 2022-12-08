// In App.js in a new project

import * as React from 'react';
import {RootNav} from 'navigation/MainRootNav/RootNav';
import {SafeAreaView, StatusBar} from 'react-native';

function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={'black'} barStyle='light-content' />
      <RootNav />
    </SafeAreaView>
  );
}

export default App;
