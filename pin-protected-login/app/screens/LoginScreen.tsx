import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, View } from 'react-native';

import { Keypad, PinPanel } from '../components';
import { colors } from '../constants';
import { WrongPinModal } from '../containers';
import { useAuth, useConfig } from '../hooks';
import { useAppStore } from '../store';
import { ApiErrorName } from '../types';

export function LoginScreen() {
  const { login } = useAuth();
  const { pinLength } = useConfig();
  const { pinError, setPinError } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [pinDigits, setPinDigits] = useState<number[]>([]);

  const enterPin = useCallback(
    (digit: number) => setPinDigits((prev) => (prev.length < 4 ? [...prev, digit] : prev)),
    []
  );

  const popDigit = useCallback(() => setPinDigits((prev) => prev.slice(0, -1)), []);

  const resetPinError = useCallback(() => setPinError(null), [setPinError]);

  useEffect(() => {
    if (pinDigits.length === pinLength) {
      setLoading(true);

      (async () => {
        try {
          await login(pinDigits.join(''));
        } catch (error) {
          console.log('Error', error);
        }
      })();
    }
  }, [pinLength, login, pinDigits]);

  useEffect(() => {
    setLoading(false);
    setPinDigits([]);
  }, [pinError]);

  return (
    <View style={styles.root}>
      <WrongPinModal
        isVisible={pinError === ApiErrorName.IncorrectPin}
        message="Incorrect pin!"
        onBackdropPress={resetPinError}
        onBackButtonPress={resetPinError}
      />

      <PinPanel digits={pinDigits} pinLength={pinLength} style={styles.marginSm} />

      <Keypad onKeyPress={enterPin} style={styles.marginSm} />

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary.dark} />
      ) : (
        <Button
          title="Delete"
          onPress={popDigit}
          disabled={!pinDigits.length}
          color={colors.info.main}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  marginSm: {
    marginBottom: 8,
  },
});
