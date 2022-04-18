import { styled } from '@mui/material';

export const Selection = styled('div')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  margin: theme.spacing(0.5),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
  background: theme.palette.grey[300],
  borderRadius: (theme.shape.borderRadius as number) * 4,
}));

export const SelectionLabel = styled('div')(({ theme }) => ({
  marginRight: theme.spacing(0.5),
}));
