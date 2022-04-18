import { createTheme, GlobalStyles } from '@mui/material';

export const theme = createTheme({});

export const GlobalCSS = () => (
  <GlobalStyles
    styles={{ '*': { boxSizing: 'border-box' }, body: { margin: 0 } }}
  />
);
