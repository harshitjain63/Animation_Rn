/* eslint-disable react-native/no-inline-styles */
import {Dimensions, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import Animated, {
  FadeIn,
  FadeInRight,
  FadeOut,
  FadeOutRight,
} from 'react-native-reanimated';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const {width} = Dimensions.get('window');

const _size = width * 0.9;

const layout = {
  borderRadius: 16,
  width: _size,
  height: _size * 1.27,
  spacing: 12,
  cardsGap: 22,
};

const Menu = ({
  menu,
  activeMenuIndex = 0,
  onClose,
  onMenuPress,
  isMenuVisible,
}: {
  menu: string[];
  activeMenuIndex?: number;
  onClose: () => void;
  onMenuPress: (index: number) => void;
  isMenuVisible: boolean;
}) => {
  if (!isMenuVisible) {
    return null;
  }
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut.delay(500)}
      style={[StyleSheet.absoluteFillObject, {zIndex: 9999999}]}
      pointerEvents={'box-none'}>
      <Pressable onPress={onClose} style={StyleSheet.absoluteFillObject}>
        <View style={{backgroundColor: Colors.dark, opacity: 0.75, flex: 1}} />
      </Pressable>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          padding: layout.cardsGap * 2,
          gap: layout.spacing,
        }}
        pointerEvents="box-none">
        {menu.map((item, index) => {
          return (
            <Pressable onPress={() => onMenuPress(index)} key={index}>
              <Animated.Text
                entering={FadeInRight.delay(50 * index)}
                exiting={FadeOutRight.delay((menu.length - index) * 50)}
                style={{
                  fontSize: 32,
                  fontWeight: 'bold',
                  color: Colors.light,
                }}>
                {index === activeMenuIndex ? '👉' : ''}
                {item}
              </Animated.Text>
            </Pressable>
          );
        })}
      </View>
    </Animated.View>
  );
};

export default Menu;
