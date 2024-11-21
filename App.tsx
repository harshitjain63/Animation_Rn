import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import HomeScreen from './screens/HomeScreen';
import GridAnimation from './screens/GridAnimation';
import TextAnimation from './screens/TextAnimation';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  GridAnimation: undefined;
  TextAnimation: undefined;
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
          <Stack.Screen
            name="GridAnimation"
            component={GridAnimation}
            options={{title: 'Grid Animation'}}
          />
          <Stack.Screen
            name="TextAnimation"
            component={TextAnimation}
            options={{title: 'Text Animation'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
