import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
};

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {/* content */}

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Home'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
