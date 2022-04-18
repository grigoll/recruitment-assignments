import { useCallback, useEffect, useRef, useState } from 'react';

type Arg = {
  multiple: boolean;
  onInputChange?: (value: string) => void;
  onSelect?: (value: string[]) => void;
};

export function useTypeahead(arg: Arg) {
  const { multiple, onInputChange, onSelect } = arg;

  const [selections, setSelections] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isDropdownVisible, setDropdownVisibility] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectOption = useCallback(
    (value: string) => {
      if (!selections.includes(value)) {
        setSelections(multiple ? (prev) => [...prev, value] : [value]);
      }
    },
    [multiple, selections]
  );

  const removeOption = useCallback(
    (value: string) => setSelections((prev) => prev.filter((n) => n !== value)),
    []
  );

  const isOptionSelected = useCallback(
    (value: string) => selections.includes(value),
    [selections]
  );

  const clearSelections = useCallback(() => setSelections([]), []);

  const showDropdown = useCallback(() => setDropdownVisibility(true), []);

  const hideDropdown = useCallback(() => setDropdownVisibility(false), []);

  useEffect(() => {
    onInputChange?.(inputValue);
  }, [inputValue, onInputChange]);

  useEffect(() => {
    onSelect?.(selections);
  }, [selections, onSelect]);

  useEffect(() => {
    inputRef.current?.blur();
  }, [selections]);

  useEffect(() => {
    const [selection = ''] = selections;

    // we don't keep selected values in input if it's multiple selection, we show them as chips
    setInputValue(multiple ? '' : selection);
  }, [selections, multiple]);

  useEffect(() => {
    if (isDropdownVisible) {
      return;
    }

    // we reset input if user didn't choose option from the dropdown
    if (multiple) {
      setInputValue('');
    } else {
      setInputValue(selections[0] ?? '');
    }
  }, [multiple, isDropdownVisible, selections]);

  return {
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
  };
}
