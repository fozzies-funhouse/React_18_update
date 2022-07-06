import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    BottomNavigationAction: {
      styleOverrides: {
        color: 'white'
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
