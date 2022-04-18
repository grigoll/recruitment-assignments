import { Box, ThemeProvider } from '@mui/material';

import { CacheProvider } from './providers';
import { GlobalCSS, theme } from './theming';
import { TypeaheadContainer } from './components';

function App() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box sx={{ mt: 5, ml: 5 }}>
        <TypeaheadContainer />
      </Box>
    </Box>
  );
}

export default function Root() {
  return (
    <CacheProvider>
      <ThemeProvider theme={theme}>
        <GlobalCSS />
        <App />
      </ThemeProvider>
    </CacheProvider>
  );
}
