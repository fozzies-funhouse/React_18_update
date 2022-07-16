export const style = {
  menu: {
    sx: { mt: '45px' },
    id: 'menu-appbar',
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right',
    },
    keepMounted: true,
    transformOrigin: {
      vertical: 'top',
      horizontal: 'right',
    },
  },
  pageBox: {
    sx: { flexGrow: 1, display: { xs: 'none', md: 'flex' } },
  },
  navLink: {
    style: {
      textDecoration: 'none',
      color: 'white',
    },
  },
  link: {
    style: {
      textDecoration: 'none',
      textAlign: 'center',
      color: 'black'
    }
  },
  logo: {
    style: {
      marginRight: 2,
      fontFamily: 'monospace',
      fontWeight: 700,
      textDecoration: 'none',
      color: 'white'
    }
  },
  navButton: {
    style: {
      backgroundColor: 'transparent',
      border: 'none',
      boxShadow: 'none',
      fontWeight: 20
    }
  }
};
