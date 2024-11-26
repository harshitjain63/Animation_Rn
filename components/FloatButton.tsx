/* eslint-disable react-native/no-inline-styles */
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const FloatButton = ({
  setValue,
  value,
}: {
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  value: boolean;
}) => {
  const scale = useSharedValue(1);
  const width = useSharedValue(55);
  const height = useSharedValue(55);
  const borderRadius = useSharedValue(40);
  const rotate = useSharedValue(0);
  const isExpanded = useSharedValue(false);
  const keyboardOffset = useSharedValue(70);
  // const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
      keyboardOffset.value = withDelay(300, withTiming(380, {duration: 500}));
      // setKeyboardHeight(event.endCoordinates.height);
    });
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      keyboardOffset.value = withTiming(70, {duration: 300});
      // setKeyboardHeight(0);
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, [keyboardOffset]);

  const handleTap = () => {
    if (!isExpanded.value) {
      scale.value = withTiming(1.5, {duration: 300});
      width.value = withTiming(200, {duration: 300});
      height.value = withTiming(200, {duration: 300});
      borderRadius.value = withTiming(20, {duration: 300});
      rotate.value = withTiming(45, {duration: 300});
    } else {
      scale.value = withTiming(1, {duration: 300});
      width.value = withTiming(55, {duration: 300});
      height.value = withTiming(55, {duration: 300});
      borderRadius.value = withTiming(40, {duration: 300});
      rotate.value = withTiming(0, {duration: 300});
      // keyboardOffset.value = withTiming(70, {duration: 300});
    }
    isExpanded.value = !isExpanded.value;
    setValue(!value);
  };

  const rButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
      width: width.value,
      height: height.value,
      borderRadius: borderRadius.value,
      bottom: keyboardOffset.value,
      // bottom: withTiming(keyboardHeight ? keyboardHeight : 70, {
      //   duration: 1500,
      // }),
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: isExpanded.value ? 83 : 0},
        {translateY: isExpanded.value ? -5 : 0},
        {rotate: `${rotate.value}deg`},
      ],
    };
  });

  const rExpandedViewStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isExpanded.value ? 1 : 0, {duration: 300}),
    };
  });

  return (
    <Animated.View style={[styles.actionButton, rButtonStyle]}>
      <Animated.Text style={[styles.text, rTextStyle]} onPress={handleTap}>
        +
      </Animated.Text>

      <Animated.View
        style={[
          rExpandedViewStyle,
          {position: 'absolute', marginTop: 10, gap: 10},
        ]}>
        <Text style={styles.titleText}>Black Friday</Text>
        <Text style={styles.bodyText}>
          <Text style={styles.linkText}>AnimateReactNative.com</Text> is now on
          sale for <Text style={styles.highlightedText}>Black Friday </Text>
          at half the price for all plans 🎊
        </Text>
        <Text style={styles.discountText}>
          Use <Text style={styles.highlightedText}>BF2023 </Text>at checkout to
          save <Text style={styles.highlightedText}>$99.5</Text>.
        </Text>

        <TextInput
          placeholder="Paste BF2023 for 50% OFF"
          placeholderTextColor={'#4c4a4d'}
          style={styles.codeInput}
        />

        <TouchableOpacity style={styles.guide}>
          <Text style={styles.guideText}>Use.Learn.Save time</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default FloatButton;

const styles = StyleSheet.create({
  actionButton: {
    position: 'absolute',
    backgroundColor: '#131114',
    bottom: 70,
    alignItems: 'center',
    zIndex: 200,
  },
  text: {
    color: 'white',
    fontSize: 35,
  },

  titleText: {
    fontSize: 16,
    color: 'white',
  },
  bodyText: {
    fontSize: 10,

    width: 175,
  },
  discountText: {
    fontSize: 10,

    width: 175,
  },
  codeInput: {
    backgroundColor: '#2c292c',

    width: 175,
    height: 35,
    borderRadius: 8,
  },
  textInput: {
    fontSize: 10,
  },
  guide: {
    backgroundColor: '#f7d106',

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
  linkText: {
    color: '#3282a5',
    fontSize: 10,
  },
  highlightedText: {fontWeight: 'bold', color: 'white'},
});
