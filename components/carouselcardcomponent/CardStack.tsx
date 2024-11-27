/* eslint-disable react/react-in-jsx-scope */
import {useEffect} from 'react';
import {Image, StyleSheet} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  useDerivedValue,
  interpolate,
  Extrapolation,
  useAnimatedStyle,
} from 'react-native-reanimated';

const CardStack = ({
  item,
  index,
  setActiveIndex,
  activeIndex,
  length,
}: {
  item: {title: string; poster: string};
  index: number;
  length: number;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const lastOffset = useSharedValue({x: 0, y: 0});
  const position = useSharedValue({x: 0, y: 0});
  const value = useSharedValue(length);

  const panGestureHandler = Gesture.Pan()
    .runOnJS(true)
    .onUpdate(({translationX, translationY}) => {
      position.value = {
        x: translationX + lastOffset.value.x,
        y: translationY + lastOffset.value.y,
      };
    })
    .onEnd(() => {
      if (
        Math.abs(position.value.x) < 100 &&
        Math.abs(position.value.y) < 100
      ) {
        lastOffset.value = {x: 0, y: 0};
        position.value = withSpring({x: 0, y: 0});
      } else {
        lastOffset.value = {x: 0, y: 0};
        position.value = withTiming({
          x: position.value.x * 10,
          y: position.value.y * 10,
        });
      }
      setActiveIndex(prevIndex => prevIndex - 1);
    });

  const rotate = useDerivedValue(() => {
    return interpolate(
      index,
      [value.value - 3, value.value - 2, value.value - 1, value.value],
      [0, 20, -20, 0],
      Extrapolation.CLAMP,
    );
  });

  const additionalTranslate = useDerivedValue(() => {
    return interpolate(
      index,
      [value.value - 3, value.value - 2, value.value - 1, value.value],
      [0, 80, -80, 0],
      Extrapolation.CLAMP,
    );
  });

  const scale = useDerivedValue(() => {
    return interpolate(
      index,
      [value.value - 3, value.value - 2, value.value - 1, value.value],
      [0.2, 0.9, 0.9, 1],
      Extrapolation.CLAMP,
    );
  });

  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {rotateZ: `${rotate.value}deg`},
        {translateX: position.value.x + additionalTranslate.value},
        {translateY: position.value.y},
        {scale: scale.value},
      ],
    };
  });

  useEffect(() => {
    value.value = withSpring(activeIndex, {
      damping: 10,
      stiffness: 100,
    });
  }, [activeIndex]);

  return (
    <GestureDetector gesture={panGestureHandler}>
      <Animated.View
        style={[{zIndex: activeIndex + 1}, stylesImage.animatedView, rnStyle]}>
        <Image source={{uri: item.poster}} style={stylesImage.imageStyle} />
      </Animated.View>
    </GestureDetector>
  );
};

export default CardStack;

const stylesImage = StyleSheet.create({
  animatedView: {
    position: 'absolute',
    height: 350,
    width: 250,
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    resizeMode: 'cover',
  },
});
