import { styled } from '@mui/material';

import {
  ClearFilledIcon,
  ClearIcon,
  Dropdown,
  Input,
  Selection,
  SelectionLabel,
} from './ui';
import { useDropdownA11y, useTypeahead } from '../hooks';
import { testId } from '../types';

const Root = styled('div')({
  display: 'flex',
  position: 'relative',
  minHeight: 54,
  minWidth: 300,
  maxWidth: 450,
});

const InputContainer = styled('div')(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  border: `2px solid ${theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius,
  paddingTop: theme.spacing(1),
  paddingLeft: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  paddingRight: '30px',
  position: 'relative',
  '&:hover': { borderColor: theme.palette.grey[500] },
  '&:focus-within': { borderColor: theme.palette.primary.main },
}));

type InputNativeProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
>;

type InputProps = { onChange?: (value: string) => void } & InputNativeProps;

type Props<T> = {
  options: T[];
  multiple?: boolean;
  loading?: boolean;
  inputProps?: InputProps;
  onSelect?: (val: string[]) => void;
};

/**
 * Component displays available options as you type in.
 *
 * Supports either single or multiple selection. For multiple selection chips of selected values are displayed
 *
 * Supports option selection using keyboard. Up/Down for navigation and Enter for choosing an option
 *
 * @component
 * @example
 *  <Typeahead options={[{ label: 'First' }, { label: 'Second' }]} />
 *
 * @example
 *  <Typeahead
 *    multiple   // <== Enables multiple options selection
 *    loading={false}   // <== Controls spinner display in options
 *    options={[
 *      { label: 'First' },
 *      { label: 'Second' }
 *    ]}
 *    inputProps={{    // <== Props that will be forwarded to a native input element
 *      name: 'input-name',
 *      placeholder: 'Name',
 *      onChange: (value) => {...}
 *    }}
 *  />
 */
export const Typeahead = <T extends { label: string }>(props: Props<T>) => {
  const {
    options,
    inputProps,
    onSelect,
    multiple = false,
    loading = false,
  } = props;

  const { onChange: onInputChange } = inputProps ?? {};

  const {
    selections,
    selectOption,
    removeOption,
    clearSelections,
    isOptionSelected,
    inputRef,
    inputValue,
    setInputValue,
    isDropdownVisible,
    showDropdown,
    hideDropdown,
  } = useTypeahead({ multiple, onInputChange, onSelect });

  const {
    focusedRef,
    focusedIndex,
    keyboardNavigationListener,
    onMouseMoveInsideDropdown,
  } = useDropdownA11y<T>({
    options,
    isDropdownVisible,
    inputValue,
    showDropdown,
    hideDropdown,
    onOptionSelect: ({ label }) => selectOption(label),
  });

  return (
    <Root
      onKeyDown={keyboardNavigationListener}
      data-testid={testId.App.Typeahead.Root}
    >
      <InputContainer>
        {multiple &&
          selections.map((item) => (
            <Selection key={item}>
              <SelectionLabel>{item}</SelectionLabel>

              <ClearFilledIcon
                color="action"
                fontSize="small"
                onClick={() => removeOption(item)}
              />
            </Selection>
          ))}

        <Input
          {...inputProps}
          ref={inputRef}
          value={inputValue}
          onChange={({ target }) => setInputValue(target.value)}
          onFocus={showDropdown}
          onBlur={hideDropdown}
          onClick={showDropdown}
        />

        {selections.length > 0 && (
          <ClearIcon
            color="action"
            fontSize="small"
            onClick={clearSelections}
          />
        )}
      </InputContainer>

      {isDropdownVisible && (
        <Dropdown
          loading={loading}
          options={options}
          onSelect={selectOption}
          onMouseMove={onMouseMoveInsideDropdown}
          focusedOptionIndex={focusedIndex}
          focusedOptionRef={focusedRef}
          isOptionActive={isOptionSelected}
        />
      )}
    </Root>
  );
};
