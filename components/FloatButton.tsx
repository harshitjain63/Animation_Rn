import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  TextInput,
} from 'react-native-gesture-handler';

const FloatButton = () => {
  const scale = useSharedValue(1);
  const width = useSharedValue(55);
  const height = useSharedValue(55);
  const borderRadius = useSharedValue(40);
  const rotate = useSharedValue(0); // For rotating the '+' into 'x'
  const isExpanded = useSharedValue(false); // Track expanded state

  const tap = Gesture.Tap().onStart(() => {
    if (!isExpanded.value) {
      // Expand
      scale.value = withTiming(1.5, {duration: 500});
      width.value = withTiming(200, {duration: 500});
      height.value = withTiming(200, {duration: 500});
      borderRadius.value = withTiming(20, {duration: 500});
      rotate.value = withTiming(45, {duration: 500}); // Rotate to 45 degrees
    } else {
      // Collapse
      scale.value = withTiming(1, {duration: 500});
      width.value = withTiming(55, {duration: 500});
      height.value = withTiming(55, {duration: 500});
      borderRadius.value = withTiming(40, {duration: 500});
      rotate.value = withTiming(0, {duration: 500}); // Rotate back to 0
    }
    isExpanded.value = !isExpanded.value;
  });

  // Animated styles for the button
  const rButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
      width: width.value,
      height: height.value,
      borderRadius: borderRadius.value,
    };
  });

  // Animated styles for the `+` text
  const rTextStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: isExpanded.value ? 80 : 0}, // Move diagonally
        {translateY: isExpanded.value ? -80 : 0}, // Move diagonally
        {rotate: `${rotate.value}deg`}, // Rotate text
      ],
    };
  });

  // Style for the expanded view
  const rExpandedViewStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isExpanded.value ? 1 : 0, {duration: 300}), // Show/Hide
    };
  });

  return (
    <GestureDetector gesture={tap}>
      <Animated.View style={[styles.actionButton, rButtonStyle]}>
        {/* Animated Text */}
        <Animated.Text style={[styles.text, rTextStyle]}>+</Animated.Text>

        {/* Hidden Component (only visible when expanded) */}
        <Animated.View style={[rExpandedViewStyle]}>
          <Text style={styles.titleText}>Black Friday</Text>
          <Text style={styles.bodyText}>
            AnimateReactNative.com is now on sale for Black Friday at half the
            price for all plans 🎊
          </Text>
          <Text style={styles.discountText}>
            Use BF2023 at checkout to save $99.5.
          </Text>
          <View style={styles.codeInput}>
            <TextInput
              placeholder="Paste BF2023 for 50% OFF"
              placeholderTextColor={'#4c4a4d'}
              style={styles.textInput}
            />
          </View>
          <TouchableOpacity style={styles.guide}>
            <Text style={styles.guideText}>Use.Learn.Save time</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

export default FloatButton;

const styles = StyleSheet.create({
  actionButton: {
    position: 'absolute',
    backgroundColor: '#131114',
    bottom: 70,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 35,
    position: 'absolute',
  },
  expandedView: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: '60%',
  },
  titleText: {
    fontSize: 16,
    color: 'white',
    position: 'absolute',
    top: -92,
    right: 5,
  },
  bodyText: {
    fontSize: 10,
    color: 'white',
    position: 'absolute',
    top: -55,
    right: -85,
    width: 175,
  },
  discountText: {
    fontSize: 10,
    color: 'white',
    position: 'absolute',
    top: -5,
    right: -85,
    width: 175,
  },
  codeInput: {
    backgroundColor: '#2c292c',
    position: 'absolute',
    top: 20,
    right: -85,
    width: 175,
    height: 31,
    borderRadius: 8,
  },
  textInput: {
    fontSize: 10,
  },
  guide: {
    backgroundColor: '#f7d106',
    position: 'absolute',
    top: 60,
    right: -85,
    width: 175,
    height: 31,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideText: {
    fontSize: 10,
    color: '#5e3f00',
    fontWeight: 'bold',
  },
});
