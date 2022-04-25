import { render } from '@testing-library/react-native';
import React from 'react';

import { PinPanel } from '../components';
import { testID } from '../constants';

describe('<PinPanel />', () => {
  test('renders pin panel with few digits entered', () => {
    const digits = [2, 5];
    const pinLength = 4;

    const { getByTestId } = render(<PinPanel digits={digits} pinLength={pinLength} />);

    digits.forEach((n, index) =>
      expect(getByTestId(testID.App.Pin.Placeholder(index, n))).not.toBeEmpty()
    );
  });
});
