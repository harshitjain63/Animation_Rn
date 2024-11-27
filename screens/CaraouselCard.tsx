import {ImageBackground, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import CardStack from '../components/carouselcardcomponent/CardStack';
import data from '../utils/cardData';

const CaraouselCard = () => {
  const [actualIndex, setActualIndex] = useState(data.length - 1);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: data[actualIndex].poster}}
        style={StyleSheet.absoluteFillObject}
        blurRadius={60}
      />
      {data.map((item, index) => (
        <CardStack
          key={index}
          activeIndex={actualIndex}
          item={item}
          index={index}
          setActiveIndex={setActualIndex}
          length={data.length}
        />
      ))}
    </View>
  );
};

export default CaraouselCard;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
