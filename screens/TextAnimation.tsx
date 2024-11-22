import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet, View, Easing, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const SENTENCES = [
  "You can't hack the driver without copying the primary ascii microchip!",
  'Try to hack the PCI transmitter; maybe it will calculate the optical firewall!',
  'If we calculate the monitor, we can get to the XML capacitor through the solid-state VGA monitor!',
  'Try to calculate the UDP monitor; maybe it will navigate the cross-platform protocol!',
  'If we quantify the firewall, we can get to the CSS program through the Bluetooth ASCII transmitter!',
  'Try to reboot the PCI pixel; maybe it will program the auxiliary application!',
  "You can't index the sensor without synthesizing the optical SMTP array!",
  'Try to synthesize the ASCII transmitter; maybe it will calculate the back-end card!',
  'If we quantify the circuit, we can get to the HDD matrix through the mobile GB array!',
];

const BACKGROUND_COLORS = [
  '#8c2be5',
  '#021e41',
  '#02a7ff',
  '#411f00',
  '#ffa600',
  '#103c68',
  '#fcf2cb',
  '#ff7064',
  '#2d2d44',
];
const TEXT_COLORS = [
  '#310047',
  '#00a7ff',
  '#051e3e',
  '#ffa80a',
  '#412204',
  '#fff0cf',
  '#103d6a',
  '#2d2b4a',
  '#ff7063',
];

const TextAnimation: React.FC = () => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [words, setWords] = useState<string[]>(SENTENCES[0].split(' '));
  const [animations, setAnimations] = useState<Animated.Value[]>([]);

  const opacityAnim = new Animated.Value(1);

  useEffect(() => {
    const newAnimations = words.map(() => new Animated.Value(0));
    setAnimations(newAnimations);
    animateWords(newAnimations);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSentenceIndex, words]);

  const animateWords = (newAnimations: Animated.Value[]) => {
    opacityAnim.setValue(1);

    const wordAnimations = newAnimations.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
    );

    Animated.sequence([
      Animated.stagger(50, wordAnimations),
      Animated.delay(1000),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(({finished}) => {
      if (finished) {
        setTimeout(() => {
          goToNextSentence();
        }, 3000);
      }
    });
  };

  const goToNextSentence = () => {
    const nextIndex = (currentSentenceIndex + 1) % SENTENCES.length;
    setWords(SENTENCES[nextIndex].split(' '));
    setCurrentSentenceIndex(nextIndex);
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
                      translateY:
                        animations[index]?.interpolate({
                          inputRange: [0, 1],
                          outputRange: [30, 0],
                        }) || 0,
                    },
                    {
                      scaleY: animations[index] || 1,
                    },
                  ],
                  opacity: animations[index] || 1,
                  color: TEXT_COLORS[currentSentenceIndex],
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
    fontSize: 54,
    fontWeight: '900',
    marginHorizontal: 4,
    lineHeight: 52,
    letterSpacing: -2,
  },
});

export default TextAnimation;
