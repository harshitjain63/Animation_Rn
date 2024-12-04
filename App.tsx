import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import HomeScreen from './screens/HomeScreen';
import GridAnimation from './screens/GridAnimation';
import TextAnimation from './screens/TextAnimation';
import Favourites from './screens/Favourites';
import CardsAnimation from './screens/CardsAnimation';
import FloatingButton from './screens/FloatingButton';
import CaraouselCard from './screens/CaraouselCard';
import OnBoardingAnimation from './screens/OnBoardingAnimation';
import {Profiler} from 'react';
import TestingScreen from './screens/TestingScreen';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  GridAnimation: undefined;
  TextAnimation: undefined;
  Favourites: undefined;
  Cards: undefined;
  FloatingButton: undefined;
  CaraouselCard: undefined;
  OnBoarding: undefined;
  Testing: undefined;
};

const App = () => {
  function onRender(
    id: string,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  ) {
    console.log('id', id);
    console.log(phase);
    console.log(actualDuration);
    console.log(baseDuration);
    console.log(startTime);
    console.log(commitTime);
  }
  return (
    <Profiler id="testprofiler" onRender={onRender}>
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
            <Stack.Screen
              name="Favourites"
              component={Favourites}
              options={{title: 'Favourites Animation', headerShown: false}}
            />
            <Stack.Screen
              name="Cards"
              component={CardsAnimation}
              options={{title: 'Cards Animation', headerShown: false}}
            />
            <Stack.Screen
              name="FloatingButton"
              component={FloatingButton}
              options={{title: 'FloatingButton Animation', headerShown: false}}
            />
            <Stack.Screen
              name="CaraouselCard"
              component={CaraouselCard}
              options={{title: 'CaraouselCard Animation', headerShown: false}}
            />
            <Stack.Screen
              name="OnBoarding"
              component={OnBoardingAnimation}
              options={{title: 'OnBoarding Animation', headerShown: false}}
            />
            <Stack.Screen
              name="Testing"
              component={TestingScreen}
              options={{title: 'Testing Screen', headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Profiler>
  );
};

export default App;
