import React from 'react';
import { Button, StyleSheet, Text } from 'react-native';

import { Modal, ModalProps } from '../components';
import { colors, testID } from '../constants';

type Props = ModalProps & { message: string };

export const WrongPinModal: React.FC<Props> = (props) => {
  const { message, style, onBackdropPress, ...rest } = props;

  return (
    <Modal containerStyle={styles.container} testID={testID.App.Pin.Modal} {...rest}>
      <Text style={styles.text}>{message}</Text>
      <Button title="Dismiss" onPress={() => onBackdropPress?.()} color={colors.info.main} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 150,
    backgroundColor: colors.common.white,
    borderRadius: 8,
  },
  text: {
    marginBottom: 40,
    color: colors.error.dark,
    fontSize: 16,
  },
});
