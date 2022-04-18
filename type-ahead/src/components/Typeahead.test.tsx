import { render, screen, fireEvent } from '@testing-library/react';

import { Typeahead } from './Typeahead';
import { KeyCode, testId } from '../types';

describe('<Typeahead />', () => {
  const placeholder = 'First name';
  const options = [{ label: 'John' }, { label: 'Grigol' }, { label: 'Sam' }];

  beforeAll(() => {
    Element.prototype.scrollIntoView = jest.fn();
  });

  test('renders plain component input', () => {
    render(<Typeahead options={[]} inputProps={{ placeholder }} />);

    const inputElement = screen.getByPlaceholderText(placeholder);

    expect(inputElement).toBeInTheDocument();
  });

  test('renders dropdown on component click', () => {
    render(<Typeahead options={[]} inputProps={{ placeholder }} />);

    const inputElement = screen.getByPlaceholderText(placeholder);
    fireEvent.focus(inputElement);

    const dropdownElement = screen.getByTestId(testId.App.Typeahead.Dropdown);
    expect(dropdownElement).toBeInTheDocument();
  });

  test('selects second item from dropdown by arrow navigation', () => {
    const option = options[1];

    const keyDown = (node: Node, code: KeyCode) =>
      fireEvent.keyDown(node, { code });

    render(<Typeahead options={options} inputProps={{ placeholder }} />);

    const inputElement =
      screen.getByPlaceholderText<HTMLInputElement>(placeholder);
    fireEvent.focus(inputElement);

    const typeaheadComponent = screen.getByTestId(testId.App.Typeahead.Root);
    keyDown(typeaheadComponent, KeyCode.Down);
    keyDown(typeaheadComponent, KeyCode.Down);
    keyDown(typeaheadComponent, KeyCode.Enter);

    expect(inputElement.value).toEqual(option.label);
  });

  test('selects third item from dropdown by click and calls onChange listener', () => {
    const option = options[2];
    const onChange = jest.fn();

    render(
      <Typeahead options={options} inputProps={{ placeholder, onChange }} />
    );

    const inputElement =
      screen.getByPlaceholderText<HTMLInputElement>(placeholder);
    fireEvent.focus(inputElement);

    const optionElement = screen.getByText(option.label);
    fireEvent.mouseDown(optionElement);

    expect(onChange).toHaveBeenCalledWith(option.label);
    expect(inputElement.value).toBe(option.label);
  });

  test('selects multiple items from dropdown by click', () => {
    const [, option2, option3] = options;

    render(
      <Typeahead multiple options={options} inputProps={{ placeholder }} />
    );

    const inputElement =
      screen.getByPlaceholderText<HTMLInputElement>(placeholder);

    fireEvent.focus(inputElement);
    fireEvent.mouseDown(screen.getByText(option2.label));
    fireEvent.mouseDown(screen.getByText(option3.label));
    fireEvent.blur(inputElement);

    expect(screen.getByText(option2.label)).toBeInTheDocument();
    expect(screen.getByText(option3.label)).toBeInTheDocument();
  });
});
