import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {
  Directions,
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import data from '../utils/data';
import Cards from '../components/Cardscomponents/Cards';
import {runOnJS, useSharedValue, withTiming} from 'react-native-reanimated';
import Menu from '../components/Cardscomponents/Menu';

const {width} = Dimensions.get('window');
const duration = 600;
const _size = width * 0.9;
const layout = {
  borderRadius: 16,
  width: _size,
  height: _size * 1.27,
  spacing: 12,
  cardsGap: 22,
};

const colors = {
  primary: '#6667AB',
  light: '#fff',
  dark: '#111',
};

const menu = ['Home', 'About', 'Contact', 'Settings', 'Logout'];

const CardsAnimation = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [aactiveIndex, setAactiveIndex] = useState(0);
  const activeIndex = useSharedValue(0);
  const flingUp = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(() => {
      if (activeIndex.value === 0) {
        return;
      }
      activeIndex.value = withTiming(activeIndex.value - 1, {duration});
      console.log('fling Up');
    });
  const flingRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onStart(() => {
      'worklet';
      runOnJS(setIsMenuVisible)(false);
    });
  const flingLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onStart(() => {
      'worklet';
      runOnJS(setIsMenuVisible)(true);
    });
  const flingDown = Gesture.Fling()
    .direction(Directions.DOWN)
    .onStart(() => {
      console.log('fling Down');
      if (activeIndex.value === data.length) {
        return;
      }
      activeIndex.value = withTiming(activeIndex.value + 1, {duration});
    });

  return (
    <GestureHandlerRootView style={styles.container}>
      <Menu
        menu={menu}
        activeMenuIndex={aactiveIndex}
        onMenuPress={index => {
          setAactiveIndex(index);
          setIsMenuVisible(false);
        }}
        onClose={() => setIsMenuVisible(false)}
        isMenuVisible={isMenuVisible}
      />
      <GestureDetector
        gesture={Gesture.Exclusive(flingUp, flingDown, flingRight, flingLeft)}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            alignItems: 'center',
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: layout.cardsGap * 2,
            // backgroundColor: 'red',
          }}
          pointerEvents="box-none">
          {data.map((c, index) => {
            return (
              <Cards
                info={c}
                key={c.id}
                index={index}
                activeIndex={activeIndex}
                totalLength={data.length - 1}
              />
            );
          })}
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default CardsAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.primary,
    padding: layout.spacing,
  },
  card: {
    borderRadius: layout.borderRadius,
    width: layout.width,
    height: layout.height,
    padding: layout.spacing,
    backgroundColor: colors.light,
  },
  title: {fontSize: 32, fontWeight: '600'},
  subtitle: {},
  cardContent: {
    gap: layout.spacing,
    marginBottom: layout.spacing,
  },
  locationImage: {
    flex: 1,
    borderRadius: layout.borderRadius - layout.spacing / 2,
  },
  row: {
    flexDirection: 'row',
    columnGap: layout.spacing / 2,
    alignItems: 'center',
  },
  icon: {},
});
