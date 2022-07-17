import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: 'rgba(0,0,0,0.8)',
          ":hover": {backgroundColor: 'rgba(0,0,0,0.8)'}
        }
      }
    }
  },
  typography: {
    bio: {
      fontSize: 12,
      maxWidth: 150,
      textAlign: 'center',
    },
  },
});

export default theme;