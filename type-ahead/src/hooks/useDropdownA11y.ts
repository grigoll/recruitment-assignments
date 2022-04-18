import { debounce } from '@mui/material';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { KeyCode } from '../types';

type Arg<T> = {
  options: T[];
  inputValue: string;
  isDropdownVisible: boolean;
  onOptionSelect: (value: T) => void;
  showDropdown: () => void;
  hideDropdown: () => void;
};

export function useDropdownA11y<T>(arg: Arg<T>) {
  const {
    options,
    isDropdownVisible,
    onOptionSelect,
    inputValue,
    showDropdown,
    hideDropdown,
  } = arg;

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const focusedRef = useRef<HTMLDivElement>(null);

  const focusNext = useCallback(() => {
    if (focusedIndex === null || focusedIndex < options.length - 1) {
      setFocusedIndex((idx) => (idx === null ? 0 : idx + 1));
    }
  }, [focusedIndex, options.length]);

  const focusPrev = useCallback(() => {
    if (focusedIndex === null || focusedIndex > 0) {
      setFocusedIndex((idx) => (idx === null ? 0 : idx - 1));
    }
  }, [focusedIndex]);

  const resetFocusedIndex = useCallback(() => setFocusedIndex(null), []);

  const handleUpDownKeyPress = useCallback(
    (code: string) => {
      if (!isDropdownVisible) {
        showDropdown();
        return;
      }

      if (code === KeyCode.Up) {
        focusPrev();
      } else {
        focusNext();
      }
    },
    [focusNext, focusPrev, isDropdownVisible, showDropdown]
  );

  const handleEnterKeyPress = useCallback(() => {
    if (focusedIndex !== null) {
      onOptionSelect(options[focusedIndex]);
      hideDropdown();
    }
  }, [focusedIndex, hideDropdown, onOptionSelect, options]);

  const keyboardNavigationListener = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.code === KeyCode.Down || event.code === KeyCode.Up) {
        event.preventDefault();
        handleUpDownKeyPress(event.code);
      } else if (event.code === KeyCode.Enter) {
        event.preventDefault();
        handleEnterKeyPress();
      }
    },
    [handleEnterKeyPress, handleUpDownKeyPress]
  );

  const onMouseMoveInsideDropdown = useMemo(
    () => debounce(resetFocusedIndex, 5),
    [resetFocusedIndex]
  );

  useEffect(() => {
    focusedRef.current?.scrollIntoView();
  }, [focusedIndex]);

  useEffect(() => {
    if (!isDropdownVisible) {
      resetFocusedIndex();
    }
  }, [isDropdownVisible, resetFocusedIndex]);

  useEffect(() => {
    resetFocusedIndex();
  }, [inputValue, resetFocusedIndex]);

  return {
    focusedRef,
    focusedIndex,
    keyboardNavigationListener,
    onMouseMoveInsideDropdown,
  };
}
