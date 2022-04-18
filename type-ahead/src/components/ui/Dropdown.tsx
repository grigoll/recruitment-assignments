import React, { forwardRef, useMemo } from 'react';
import { styled } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import { CircularProgress } from '@mui/material';
import { testId } from '../../types';

const OptionList = styled('div')(({ theme }) => ({
  position: 'absolute',
  inset: 'auto 0 0 0',
  transform: 'translateY(100%)',
  maxHeight: 400,
  overflow: 'auto',
  boxShadow: '0px 7px 29px 0px rgba(100, 100, 111, 0.2)',
  background: theme.palette.common.white,
}));

type DropdownOptionProps = {
  active: boolean;
  focused: boolean;
};

const OptionBase = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & DropdownOptionProps
>(({ active, children, ...props }, ref) => (
  <div ref={ref} {...props}>
    <span>{children}</span>
    {active && <CheckIcon fontSize="small" color="primary" sx={{ ml: 1 }} />}
  </div>
));

const Option = styled(OptionBase, {
  shouldForwardProp: (prop) => prop !== 'focused',
})(({ theme, active, focused }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1.5),
  cursor: active ? 'initial' : 'pointer',
  backgroundColor: focused ? theme.palette.grey[300] : 'none',
  '&:hover': { backgroundColor: focused ? 'none' : theme.palette.grey[200] },
}));

const DropdownEmpty = styled('div')(({ theme }) => ({
  padding: theme.spacing(1.5),
}));

type Props<T> = {
  options: T[];
  loading: boolean;
  focusedOptionIndex: number | null;
  focusedOptionRef: React.RefObject<HTMLDivElement>;
  onSelect: (value: string) => void;
  isOptionActive: (value: string) => boolean;
  onMouseMove: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const Dropdown = <T extends { label: string }>(props: Props<T>) => {
  const {
    onMouseMove,
    loading,
    options,
    focusedOptionIndex,
    focusedOptionRef,
    onSelect,
    isOptionActive,
  } = props;

  const rootProps = useMemo(
    () => ({
      onMouseMove,
      'data-testid': testId.App.Typeahead.Dropdown,
    }),
    [onMouseMove]
  );

  if (loading) {
    return (
      <OptionList {...rootProps}>
        <DropdownEmpty sx={{ display: 'flex' }}>
          <CircularProgress size={18} sx={{ margin: 'auto' }} />
        </DropdownEmpty>
      </OptionList>
    );
  }

  return (
    <OptionList {...rootProps}>
      {options.length > 0 ? (
        options.map(({ label }, idx) => (
          <Option
            key={label} // we can use labels since they should be unique as there's no point in having duplicate options
            ref={focusedOptionIndex === idx ? focusedOptionRef : null}
            focused={focusedOptionIndex === idx}
            active={isOptionActive(label)}
            onMouseDown={() => onSelect(label)}
          >
            {label}
          </Option>
        ))
      ) : (
        <DropdownEmpty sx={{ opacity: 0.5 }}>No options</DropdownEmpty>
      )}
    </OptionList>
  );
};
