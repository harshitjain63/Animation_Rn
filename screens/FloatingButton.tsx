import {StyleSheet, View} from 'react-native';
import React from 'react';
import FloatButton from '../components/FloatButton';

const FloatingButton = () => {
  return (
    <View style={styles.container}>
      <FloatButton />
    </View>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    alignItems: 'center',
  },
});
