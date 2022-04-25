export const testID = {
  App: {
    Pin: {
      Placeholder: (index: number, digit: number) => `pin-${index}-${digit}`,
      Modal: 'wrong-pin-modal',
    },
    Keypad: {
      Digit: (digit: number) => `keypad-${digit}`,
    },
  },
};
