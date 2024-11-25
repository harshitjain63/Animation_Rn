import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import FloatButton from '../components/FloatButton';

const colorCodes = [
  '#f1959c',
  '#c2d8fc',
  '#a5345e',
  '#c44e67',
  '#fde1cc',
  '#ffe6cf',
  '#eb9de8',
  '#ea8bd3',
  '#f1959c',
  '#c2d8fc',
  '#a5345e',
  '#c44e67',
  '#fde1cc',
  '#ffe6cf',
  '#eb9de8',
  '#ea8bd3',
];

const FloatingButton = () => {
  const renderItem = ({item}: {item: string}) => {
    return (
      <View
        style={[
          styles.item,
          {
            backgroundColor: item,
          },
        ]}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={colorCodes}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item, index) => `${item}_${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        columnWrapperStyle={styles.columnWrapper}
      />
      <FloatButton />
    </View>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  flatlist: {
    flex: 1,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  item: {
    height: 170,
    width: 155,
    borderRadius: 15,
    margin: 5,
  },
});
