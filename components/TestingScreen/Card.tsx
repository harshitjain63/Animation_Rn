import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const Card = ({
  title,
  description,
  imageUrl,
}: {
  title: string;
  description: string;
  imageUrl: {
    uri: string;
  };
}) => {
  return (
    <View style={styles.card}>
      <Image testID="card-image" source={imageUrl} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    margin: 8,
    borderColor: '#ddd',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default Card;
