import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Card from '../components/TestingScreen/Card';

const backgroundImage = {
  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
};

const TestingScreen = () => {
  const [inputValue, setInputValue] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image testID="image" source={backgroundImage} style={styles.image} />
      <Text style={styles.text}>Count: {count}</Text>
      <Text style={styles.text}>React Native</Text>
      <Card
        title={'Hello'}
        description={'Testing'}
        imageUrl={backgroundImage}
      />
      <TextInput
        testID="textInput"
        style={styles.textInput}
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Enter text here"
        placeholderTextColor={'white'}
      />
      <Text testID="paragraph" style={styles.paragraph}>
        React Native allows developers who know React to create native apps.
      </Text>

      <TouchableOpacity
        testID="button"
        style={styles.button}
        onPress={() => console.log('Button pressed')}>
        <Text style={styles.textbtn}>Press</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TestingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    paddingVertical: 30,
  },
  text: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    height: 110,
    width: 125,
  },
  paragraph: {
    color: 'grey',
    fontSize: 20,
    width: 330,
    marginTop: 10,
  },
  textInput: {
    borderWidth: 5,
    borderColor: 'skyblue',
    borderRadius: 20,
    padding: 10,
    width: 300,
    marginTop: 20,

    backgroundColor: 'black',
  },
  button: {
    backgroundColor: 'black',
    borderWidth: 5,
    borderColor: 'skyblue',
    borderRadius: 20,
    width: 220,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  textbtn: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
});
