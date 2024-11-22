import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import data from '../utils/data';
import Cards from '../components/Cardscomponents/Cards';

const {width} = Dimensions.get('window');
const duration = 300;
const _size = width * 0.9;
const layout = {
  borderRadius: 16,
  width: _size,
  height: _size * 1.27,
  spacing: 12,
  cardsGap: 22,
};
const maxVisibleItems = 6;

const colors = {
  primary: '#6667AB',
  light: '#fff',
  dark: '#111',
};

const CardsAnimation = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'flex-end',
          marginBottom: layout.cardsGap * 2,
        }}
        pointerEvents="box-none">
        {data.slice(0, 1).map((c, index) => {
          return (
            <Cards
              info={c}
              key={c.id}
              index={index}
              totalLength={data.length - 1}
            />
          );
        })}
      </View>
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
