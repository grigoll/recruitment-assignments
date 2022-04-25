import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import { Button, StyleSheet, Text } from 'react-native';

import { Modal } from '../components';
import { colors } from '../constants';

export const GlobalErrorHandler: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <Modal isVisible={!!error} containerStyle={styles.modalContent}>
      <Text>Error occurred</Text>

      <Text style={[styles.textError, styles.spacing]}>{error.message}</Text>

      <Text style={styles.spacing}>Please try again</Text>

      <Button title="Dismiss" onPress={resetErrorBoundary} color={colors.info.light} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    width: 300,
    height: 200,
    borderRadius: 8,
    backgroundColor: colors.common.white,
  },
  textError: {
    marginBottom: 24,
    color: colors.error.light,
  },
  spacing: {
    marginBottom: 24,
  },
});
