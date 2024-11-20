import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';

const GridAnimation = () => {
  const gridSize = 8; // 8x8 grid
  const totalCircles = gridSize * gridSize;

  // Animated values for each circle's color
  const circleAnimations = useRef(
    Array.from({length: totalCircles}, () => new Animated.Value(0)),
  ).current;

  // Letter shapes mapped to grid indices (centered in an 8x8 grid)
  const letterShapes: {[key: string]: number[]} = {
    H: [
      1, 9, 17, 25, 33, 41, 49, 57, 26, 27, 28, 29, 5, 13, 21, 37, 45, 53, 61,
    ],
    E: [1, 2, 3, 4, 9, 17, 25, 33, 41, 49, 57, 58, 59, 60, 26, 27, 28],
    L: [1, 9, 17, 25, 33, 41, 49, 57, 58, 59, 60, 61],
    O: [
      1, 2, 3, 4, 9, 17, 25, 33, 41, 49, 57, 58, 59, 60, 52, 44, 36, 28, 20, 12,
    ],
  };

  useEffect(() => {
    const animateLetters = async () => {
      const letters = 'HELLO'.split('');

      for (const letter of letters) {
        const indices = letterShapes[letter]; // Accessing by letter
        console.log(indices);

        if (indices) {
          // Light up the circles for the current letter at once
          const highlightAnimations = indices.map(index =>
            Animated.timing(circleAnimations[index], {
              toValue: 1, // Highlight the circle
              duration: 200,
              useNativeDriver: false,
            }),
          );

          // Start all highlight animations simultaneously
          await new Promise(resolve =>
            Animated.parallel(highlightAnimations).start(resolve),
          );
        }

        // Pause before moving to the next letter
        await new Promise(resolve => setTimeout(resolve, 500));

        // Reset grid colors after showing the letter
        const resetAnimations = circleAnimations.map(anim =>
          Animated.timing(anim, {
            toValue: 0, // Reset color
            duration: 120,
            useNativeDriver: false,
          }),
        );

        // Reset all circles at once
        await new Promise(resolve =>
          Animated.parallel(resetAnimations).start(resolve),
        );
      }
    };

    animateLetters();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {circleAnimations.map((animation, index) => (
          <Animated.View
            key={index}
            style={[
              styles.circleContainer,
              {
                backgroundColor: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['pink', 'purple'], // Outer circle turns purple when highlighted
                }),
              },
            ]}>
            {/* Inner pink circle */}
            <Animated.View
              style={[
                styles.innerCircle,
                {
                  opacity: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1], // Fade in inner circle when animation reaches 1
                  }),
                },
              ]}>
              {/* Green inner circle */}
              <Animated.View
                style={[
                  styles.greenInnerCircle,
                  {
                    opacity: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1], // Fade in green inner circle when animation reaches 1
                    }),
                  },
                ]}
              />
            </Animated.View>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe6f0', // Light pink background
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 200, // Grid width
    height: 200, // Grid height
  },
  circleContainer: {
    width: 20,
    height: 20,
    margin: 2,
    borderRadius: 10,
    backgroundColor: 'pink', // Default circle color (gray)
  },
  innerCircle: {
    width: 18,
    height: 18,
    borderRadius: 13, // Circular shape
    backgroundColor: 'purple', // Inner circle color
    marginTop: 3,
    marginLeft: 5,
  },
  greenInnerCircle: {
    width: 11,
    height: 11,
    borderRadius: 6, // Circular shape for the green circle
    backgroundColor: 'pink', // Green inner circle color
    marginTop: 3,
    marginLeft: 3,
  },
});

export default GridAnimation;
