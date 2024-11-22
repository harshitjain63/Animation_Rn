import React from 'react';
import {View, FlatList, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {RootStackParamList} from '../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

type ScreenNames = keyof RootStackParamList;

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface ListItem {
  id: number;
  title: string;
  screen: ScreenNames;
  backgroundColor: string;
}

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const data: ListItem[] = [
    {
      id: 1,
      title: 'Grid Animation Screen',
      screen: 'GridAnimation',
      backgroundColor: '#FFDDC1',
    },
    {
      id: 2,
      title: 'Text Animation Screen',
      screen: 'TextAnimation',
      backgroundColor: '#FFABAB',
    },
    {
      id: 3,
      title: 'Favorite Animation Screen',
      screen: 'Favourites',
      backgroundColor: '#FFC3A0',
    },
  ];

  const renderItem = ({item}: {item: ListItem}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(item.screen)}
        style={[styles.itemContainer, {backgroundColor: item.backgroundColor}]}>
        <Text style={styles.itemText}>{`${item.id}. ${item.title}`}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0F8F0',
  },
  itemContainer: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 18,
    color: 'black',
  },
});

export default HomeScreen;
