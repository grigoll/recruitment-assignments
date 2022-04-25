import { FontAwesome } from '@expo/vector-icons';
import React, { memo } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { colors, testID } from '../constants';

type Props = ViewProps & {
  digits: number[];
  pinLength: number;
};

export const PinPanel = memo<Props>(({ digits, pinLength, style, ...props }) => {
  return (
    <View style={[styles.root, style]} {...props}>
      {digits.concat(Array.from({ length: pinLength - digits.length })).map((n, index) => (
        <View key={index} style={styles.pinBox} testID={testID.App.Pin.Placeholder(index, n)}>
          <FontAwesome
            name={Number.isInteger(n) ? 'circle' : 'circle-o'}
            size={20}
            color={colors.primary.dark}
          />
        </View>
      ))}
    </View>
  );
});

PinPanel.displayName = 'PinPanel';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  pinBox: {
    margin: 10,
  },
});
