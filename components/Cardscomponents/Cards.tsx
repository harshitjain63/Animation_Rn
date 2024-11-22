import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import data, {locationImage} from '../../utils/data';

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

const Cards = ({
  info,
  index,
  totalLength,
}: {
  totalLength: number;
  index: number;
  info: (typeof data)[0];
}) => {
  return (
    <View style={[styles.card]}>
      <Text
        style={[
          styles.title,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            position: 'absolute',
            top: -layout.spacing,
            right: layout.spacing,
            fontSize: 102,
            color: colors.primary,
            opacity: 0.05,
          },
        ]}>
        {index}
      </Text>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{info.type}</Text>
        <View style={styles.row}>
          <Image
            source={require('../../assets/clock.png')}
            style={styles.icon}
          />
          <Text style={styles.subtitle}>
            {info.from} - {info.to}
          </Text>
        </View>
        <View style={styles.row}>
          <Image
            source={require('../../assets/location.png')}
            style={styles.icon}
          />
          <Text style={styles.subtitle}>{info.distance} km</Text>
        </View>
        <View style={styles.row}>
          <Image
            source={require('../../assets/briefcase.png')}
            style={styles.icon}
          />
          <Text style={styles.subtitle}>{info.role}</Text>
        </View>
      </View>
      <Image source={{uri: locationImage}} style={styles.locationImage} />
    </View>
  );
};

export default Cards;

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
  title: {fontSize: 32, fontWeight: '600', color: 'black'},
  subtitle: {
    color: 'black',
  },
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
  icon: {
    height: 16,
    width: 16,
  },
});
