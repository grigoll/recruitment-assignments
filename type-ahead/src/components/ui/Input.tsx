import { styled } from '@mui/material';

export const Input = styled('input')(({ theme }) => ({
  all: 'unset',
  padding: theme.spacing(0.5),
  height: 28,
  width: 0,
  minWidth: 55,
  flexGrow: 1,
}));
