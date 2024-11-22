import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

type props = {
  length: number;
  translationY: SharedValue<number>;
};

const Header = ({length, translationY}: props) => {
  const rAnimatedStyle = useAnimatedStyle(() => {
    const Height = interpolate(
      translationY.value,
      [0, 500],
      [400, 100],
      'clamp',
    );
    return {
      height: Height,
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const fontsize = interpolate(
      translationY.value,
      [0, 500],
      [60, 30],
      'clamp',
    );
    return {
      fontSize: fontsize,
    };
  });

  return (
    <Animated.View style={[styles.container, rAnimatedStyle]}>
      <Animated.Text style={[styles.text, rTextStyle]}>Favorites</Animated.Text>
      <Text style={styles.length}>{length} contacts</Text>
      <View style={styles.row}>
        <Image
          source={require('../../assets/search-interface-symbol.png')}
          style={styles.image}
        />
        <Image source={require('../../assets/plus.png')} style={styles.image} />
        <Image source={require('../../assets/dots.png')} style={styles.image} />
      </View>
    </Animated.View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0c1d34',
    padding: 10,
    paddingTop: 35,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    position: 'absolute',
    bottom: 10,
    right: 0,
    paddingHorizontal: 10,
  },
  icontext: {
    color: 'white',
    fontSize: 20,
  },
  image: {
    tintColor: 'white',
    height: 22,
    width: 22,
  },
  length: {
    color: 'white',
  },
});
