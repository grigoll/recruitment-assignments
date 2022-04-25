import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

import { colors } from '../constants';
import { useAuth } from '../hooks';

export function HomeScreen() {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <Button title="Log out" onPress={logout} color={colors.warning.main} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
