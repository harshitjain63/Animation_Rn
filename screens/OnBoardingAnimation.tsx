/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolation,
  runOnJS,
} from 'react-native-reanimated';
import SwipeView from '../components/Onboarding/SwipeView';
import {onboardingdata} from '../utils/onboardingdata';

const Screen_Width = Dimensions.get('window').width;
const Screen_Height = Dimensions.get('window').height;

const OnBoardingAnimation = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const circlePositions = [
    {
      x: useSharedValue(0),
      y: useSharedValue(0),
      scale: useSharedValue(0),
      borderWidth: useSharedValue(0),
    },
    {
      x: useSharedValue(0),
      y: useSharedValue(0),
      scale: useSharedValue(0),
      borderWidth: useSharedValue(0),
    },
    {
      x: useSharedValue(0),
      y: useSharedValue(0),
      scale: useSharedValue(0),
      borderWidth: useSharedValue(0),
    },
  ];

  // Update shared values after initial rendering

  // Scroll-related shared values
  const scrollX = useSharedValue(0);
  const translationX = useSharedValue(0);

  // Randomize circle positions and styles on index change
  useEffect(() => {
    circlePositions.forEach(circle => {
      circle.x.value = withSpring(Math.random() * (Screen_Width - 200));
      circle.y.value = withSpring(Math.random() * (Screen_Height - 550));
      circle.scale.value = withSpring(Math.max(Math.random(), 0.6) * 1.8);
      circle.borderWidth.value = withSpring(Math.max(4, Math.random() * 10));
    });
  }, [activeIndex, circlePositions]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollX.value = e.contentOffset.x;
      translationX.value = e.contentOffset.x;

      // Determine active index and trigger circle randomization
      const index = Math.round(e.contentOffset.x / Screen_Width);
      if (index !== activeIndex) {
        runOnJS(setActiveIndex)(index);
      }
    },
  });

  return (
    <View style={styles.container}>
      {/* Background Circles */}
      {circlePositions.map((circle, i) => {
        const rStyle = useAnimatedStyle(() => ({
          transform: [
            {translateX: circle.x.value},
            {translateY: circle.y.value},
            {scale: circle.scale.value},
          ],
          borderWidth: circle.borderWidth.value,
        }));

        return <Animated.View key={i} style={[styles.circle, rStyle]} />;
      })}

      {/* Scrollable Content */}
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={{flexGrow: 1}}
        horizontal={true}
        pagingEnabled
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        {onboardingdata.map((item, index) => (
          <SwipeView
            key={index}
            item={item}
            index={index}
            translationX={translationX}
          />
        ))}
      </Animated.ScrollView>

      <View style={styles.paginationContainer}>
        {onboardingdata.map((_, index) => {
          const rStyle = useAnimatedStyle(() => {
            const widthValue = interpolate(
              scrollX.value,
              [
                (index - 1) * Screen_Width,
                index * Screen_Width,
                (index + 1) * Screen_Width,
              ],
              [12, 20, 12],
              Extrapolation.CLAMP,
            );

            const opacityValue = interpolate(
              scrollX.value,
              [
                (index - 1) * Screen_Width,
                index * Screen_Width,
                (index + 1) * Screen_Width,
              ],
              [0.2, 1, 0.2],
              Extrapolation.CLAMP,
            );

            return {
              width: widthValue,
              opacity: opacityValue,
            };
          });

          return (
            <Animated.View key={index} style={[styles.paginationDot, rStyle]} />
          );
        })}
      </View>
    </View>
  );
};

export default OnBoardingAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circle: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: 0,
    borderRadius: 100,
    borderColor: 'black',
  },
  paginationContainer: {
    flexDirection: 'row',
    width: '60%',
    paddingHorizontal: 20,
    columnGap: 4,
    position: 'absolute',
    bottom: Dimensions.get('window').height * 0.1,
    alignItems: 'center',
    height: 50,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'black',
  },
});
