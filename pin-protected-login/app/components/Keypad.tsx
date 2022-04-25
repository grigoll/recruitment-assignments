import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View, ViewProps } from 'react-native';

import { colors, testID } from '../constants';

const KEYPAD = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [0]];

type Props = ViewProps & {
  onKeyPress: (key: number) => void;
};

export const Keypad = memo<Props>(({ onKeyPress, style, ...props }) => (
  <View style={[styles.root, style]} {...props}>
    {KEYPAD.map((row, index) => (
      <View key={index} style={styles.row}>
        {row.map((n, idx) => (
          <Pressable key={idx} onPressOut={() => onKeyPress(n)} testID={testID.App.Keypad.Digit(n)}>
            {({ pressed }) => (
              <View style={[styles.button, pressed && styles.buttonPressed]}>
                <Text style={[styles.text, pressed && styles.textPressed]}>{n}</Text>
              </View>
            )}
          </Pressable>
        ))}
      </View>
    ))}
  </View>
));

Keypad.displayName = 'Keypad';

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 40,
    height: 70,
    width: 70,
    margin: 4,
    borderColor: colors.primary.dark,
  },
  buttonPressed: {
    backgroundColor: colors.primary.dark,
  },
  text: {
    color: colors.info.dark,
  },
  textPressed: {
    color: colors.common.white,
  },
});
