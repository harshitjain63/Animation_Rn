import {View, Button} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <View>
      <Button
        title="Grid Animation Screen"
        onPress={() => navigation.navigate('GridAnimation')}
      />
      <Button
        title="Text Animation Screen"
        onPress={() => navigation.navigate('TextAnimation')}
      />
      <Button
        title="Text Animation Screen"
        onPress={() => navigation.navigate('Favourites')}
      />
    </View>
  );
};

export default HomeScreen;
