import MuiClearIcon from '@mui/icons-material/Clear';
import MuiClearFilledIcon from '@mui/icons-material/Cancel';
import { styled } from '@mui/material';

export const ClearIcon = styled(MuiClearIcon)(({ theme }) => ({
  cursor: 'pointer',
  marginRight: '10px',
  position: 'absolute',
  right: 0,
  borderRadius: '50%',
  transition: 'background 50ms linear',
  '&:hover': { backgroundColor: theme.palette.grey[300] },
}));

export const ClearFilledIcon = styled(MuiClearFilledIcon)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'color 50ms linear',
  '&:hover': { color: theme.palette.grey[500] },
}));
