import { render } from '@testing-library/react-native';
import React from 'react';

import { WrongPinModal } from '../components';

describe('<WrongPinModal />', () => {
  test('renders modal correctly', () => {
    const message = 'Wrong pin';

    const { getByText } = render(<WrongPinModal isVisible message={message} />);

    expect(getByText(message)).not.toBeEmpty();
  });
});
