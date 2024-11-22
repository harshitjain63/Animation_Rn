import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from '../components/Favourites/Header';
import ImageView from '../components/Favourites/ImageView';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

export type ImageProp = {
  name: {
    first: string;
    last: string;
  };
  picture: {
    large: string;
  };
};

const Favourites = () => {
  const [data, setData] = useState<ImageProp[]>([]);

  const getApiData = async () => {
    const response = await axios.get('https://randomuser.me/api/?results=100');
    console.log(response.data);
    if (response.data) {
      setData(response.data.results);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const renderItem = ({item}: {item: ImageProp}) => {
    return <ImageView item={item} />;
  };

  const translationY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      translationY.value = e.contentOffset.y;
    },
  });

  return (
    <View style={styles.container}>
      <Header length={data.length} translationY={translationY} />
      <Animated.FlatList
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        data={data}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item, index) => item.name.first + index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        style={styles.flatlist}
      />
    </View>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  flatlist: {
    flex: 1,
  },
});
