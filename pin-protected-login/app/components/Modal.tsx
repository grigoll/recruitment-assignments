import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import RNModal, { ModalProps as RNModalProps } from 'react-native-modal';

export type ModalProps = Partial<RNModalProps> & {
  containerStyle?: ViewProps['style'];
};

export const Modal: React.FC<ModalProps> = (props) => {
  const { style, containerStyle, children, ...rest } = props;

  return (
    <RNModal style={[styles.modal, style]} {...rest}>
      <View style={[styles.container, containerStyle]}>{children}</View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
