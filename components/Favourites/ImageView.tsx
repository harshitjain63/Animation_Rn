import {Dimensions, ImageBackground, StyleSheet, Text} from 'react-native';
import React from 'react';
import {ImageProp} from '../../screens/Favourites';

const ImageView = ({item}: {item: ImageProp}) => {
  return (
    <ImageBackground
      source={{uri: item.picture.large}}
      style={styles.container}>
      <Text style={styles.text}>
        {item.name.first} {item.name.last}
      </Text>
    </ImageBackground>
  );
};

export default ImageView;

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: Dimensions.get('window').width / 2,
    backgroundColor: 'green',
    justifyContent: 'flex-end',
  },

  text: {
    padding: 15,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 15,
  },
});
