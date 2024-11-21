import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, View, Easing, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const SENTENCES = [
  'React Native makes mobile app development easy and fun.',
  'Animations bring your app to life.',
  "Let's code and create magic!",
];

const BACKGROUND_COLORS = ['#F5B7B1', '#D5DBDB', '#F0E68C'];
const TEXT_COLORS = ['#1C2833', '#E74C3C', '#85C1AE'];

const TextAnimation: React.FC = () => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [words, setWords] = useState<string[]>(SENTENCES[0].split(' '));
  const animations = useRef(words.map(() => new Animated.Value(0))).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    animateWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSentenceIndex]);

  const animateWords = () => {
    opacityAnim.setValue(1);

    const wordAnimations = animations.map((anim, _) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,

        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
    );

    Animated.sequence([
      Animated.stagger(200, wordAnimations),
      Animated.delay(1000),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        goToNextSentence();
      }, 500);
    });
  };

  const goToNextSentence = () => {
    const nextIndex = (currentSentenceIndex + 1) % SENTENCES.length;
    setWords(SENTENCES[nextIndex].split(' '));
    setCurrentSentenceIndex(nextIndex);

    animations.forEach(anim => anim.setValue(0));
    opacityAnim.setValue(1);
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: BACKGROUND_COLORS[currentSentenceIndex]},
      ]}>
      <Animated.View style={{opacity: opacityAnim}}>
        <View style={styles.sentenceContainer}>
          {words.map((word, index) => (
            <Animated.Text
              key={`${word}-${index}`}
              style={[
                styles.word,
                {
                  transform: [
                    {
                      translateY: animations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [30, 0], // From bottom to position
                      }),
                    },
                  ],
                  opacity: animations[index],
                  color: TEXT_COLORS[currentSentenceIndex], // Change text color based on sentence
                },
              ]}>
              {word}
            </Animated.Text>
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width,
    height,
  },
  sentenceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  word: {
    fontSize: 50,
    fontWeight: '600',
    marginHorizontal: 4,
  },
});

export default TextAnimation;
