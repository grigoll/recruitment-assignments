import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { Keypad } from '../components';
import { testID } from '../constants';

describe('<Keypad />', () => {
  test('presses different digits', () => {
    const digits = [2, 5, 7];
    const onKeyPress = jest.fn();

    const { getByTestId } = render(<Keypad onKeyPress={onKeyPress} />);

    digits.forEach((d) => fireEvent(getByTestId(testID.App.Keypad.Digit(d)), 'onPressOut'));

    digits.forEach((d) => expect(onKeyPress).toBeCalledWith(d));
  });
});
