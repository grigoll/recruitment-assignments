import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { testID } from '../constants';
import { ApiError } from '../lib';
import { ApiClientProvider } from '../providers';
import { LoginScreen } from '../screens';
import { ApiErrorName, HttpClient, LoginResponse, RequestOptions } from '../types';

describe('<App />', () => {
  test('enters wrong pin and sees wrong pin modal', () => {
    const { getByTestId } = render(
      <ApiClientProvider value={new MockApiClient()}>
        <LoginScreen />
      </ApiClientProvider>
    );

    const modal = getByTestId(testID.App.Pin.Modal);

    expect(modal).toHaveProp('visible', false);

    [1, 2, 2, 1].forEach((d) => fireEvent(getByTestId(testID.App.Keypad.Digit(d)), 'onPressOut'));

    expect(modal).toHaveProp('visible', true);
  });
});

class MockApiClient implements HttpClient {
  post<R>(url: string, options: RequestOptions): Promise<R> {
    if (options.json?.pin === '1111') {
      return Promise.resolve<LoginResponse>({ token: '1234567890' }) as unknown as Promise<R>;
    }

    throw new ApiError(ApiErrorName.IncorrectPin);
  }
}
