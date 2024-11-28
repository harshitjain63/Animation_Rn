import {Dimensions, ImageProps, StyleSheet, View} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

const {width} = Dimensions.get('screen');
const Screen_Width = Dimensions.get('window').width;

const SwipeView = ({
  item,
  index,
  translationX,
}: {
  item: {title: string; poster: ImageProps};
  index: number;
  translationX: SharedValue<number>;
}) => {
  const rnImage = useAnimatedStyle(() => {
    const opacity = interpolate(
      translationX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, 1, 0],
    );

    return {
      opacity: opacity,
    };
  });

  const rnText = useAnimatedStyle(() => {
    const scale = interpolate(
      translationX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0.5, 1, 0.5],
      'clamp',
    );

    const fontsize = interpolate(
      translationX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [23, 25, 23],
      'clamp',
    );

    const opacityValue = interpolate(
      translationX.value,
      [
        (index - 1) * Screen_Width,
        index * Screen_Width,
        (index + 1) * Screen_Width,
      ],
      [0, 1, 0.2],
      Extrapolation.CLAMP,
    );

    return {
      opacity: opacityValue,
      transform: [{scale: scale}],
      fontSize: fontsize,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={item.poster}
        style={[styles.imageStyle, rnImage]}
      />
      <Animated.Text style={[styles.text, rnText]}>{item.title}</Animated.Text>
    </View>
  );
};

export default SwipeView;

const styles = StyleSheet.create({
  container: {
    height: 420,
    width: 360,
    paddingHorizontal: 20,
  },
  imageStyle: {
    height: 300,
    width: 300,
    alignSelf: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 25,
    width: 160,
    marginTop: 50,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  indicator: {
    width: 13,
    height: 7,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: 'grey',
  },
  circle1: {
    position: 'absolute',
    height: 300,
    width: 300,
    borderRadius: 200,
    borderWidth: 10,
    borderColor: 'black',
  },
  circle2: {
    position: 'absolute',
    height: 250,
    width: 250,
    borderRadius: 200,
    borderWidth: 6,
    borderColor: 'black',
  },
  circle3: {
    position: 'absolute',
    height: 200,
    width: 200,
    borderRadius: 200,
    borderWidth: 4,
    borderColor: 'black',
  },
});
