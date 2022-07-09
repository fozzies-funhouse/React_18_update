import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import Cart from './Cart';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

const Navigation = ({ handleLogout, isLoggedIn, createGuestCart, user }) => {
  const [userMenu, setUserMenu] = useState(false);
  const openUserMenu = () => setUserMenu(true);
  const closeUserMenu = () => setUserMenu(false);
  console.log('user', user)
  const renderUserMenu = () => {
    return (
      <Box sx={{ flexGrow: 0 }}>
        <IconButton onClick={openUserMenu}>
          <Avatar></Avatar>
        </IconButton>
      </Box>
    );
  };

  const pages = ['Home', 'Products', 'Login', 'Signup'];
  const settings = ['Profile', 'Logout'];
  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar>
          <Typography variant='h6'>Logo</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleLogout() {
      dispatch(logout());
    },
    createGuestCart() {
      if (!window.localStorage.cart) {
        window.localStorage.setItem(
          'cart',
          JSON.stringify({ cart_details: [] })
        );
      }
    },
  };
};

export default connect(mapState, mapDispatch)(Navigation);

// <Navbar bg='light' variant='light' sticky='top'>
//     <Container>
//       <Navbar.Brand as={Link} to='/'>
//         Trekkies Snowboard & Skis
//       </Navbar.Brand>
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <Nav>
//             <Nav.Link as={Link} to='/home'>
//               Home
//             </Nav.Link>
//             <Nav.Link as={Link} to='/' href='#' onClick={handleLogout}>
//               logout
//             </Nav.Link>
//             <Nav.Link as={Link} to='/products'>
//               Products
//             </Nav.Link>
//             <Nav.Item
//               style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}
//             >
//               <Cart />
//               <Form
//                 style={{
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   marginLeft: '5rem',
//                 }}
//               >
//                 <Form.Control type='text'></Form.Control>
//                 <Button variant='secondaray'>Search</Button>
//               </Form>
//             </Nav.Item>
//           </Nav>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <Nav>
//             <Nav.Link as={Link} to='/'>
//               Home
//             </Nav.Link>
//             <Nav.Link as={Link} to='/login'>
//               Login
//             </Nav.Link>
//             <Nav.Link as={Link} to='/signup'>
//               Sign Up
//             </Nav.Link>
//             <Nav.Link
//               as={Link}
//               to='/products'
//               onClick={() => createGuestCart()}
//             >
//               Products
//             </Nav.Link>
//             <Nav.Item
//               style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}
//             >
//               <Cart />
//             </Nav.Item>
//             <Form
//               style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 marginLeft: '5rem',
//               }}
//             >
//               <Form.Control type='text'></Form.Control>
//               <Button variant='secondaray'>Search</Button>
//             </Form>
//           </Nav>
//         </div>
//       )}
//     </Container>
//   </Navbar>





const Navigation = (props) => {
  const { handleLogout, isLoggedIn, createGuestCart, user } = props;

  const [userMenu, setUserMenu] = useState(false);
  const openUserMenu = (event) => setUserMenu(event.currentTarget);
  const closeUserMenu = () => setUserMenu(null);
  const pages = ['Home', 'Products', 'Login', 'Signup'];
  const settings = ['Profile', 'Logout'];


  return (
    <>
      {isLoggedIn ? (
        <AppBar position='static'>
          <Container maxWidth='xl'>
            <Toolbar disableGutters>
              <Typography
                variant='h6'
                noWrap
                sx={{
                  mr: 3,
                }}
              >
                LOGO
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size='large'
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={openUserMenu}
                  color='inherit'
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={userMenu}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(userMenu)}
                  onClose={closeUserMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={closeUserMenu}>
                      <Typography textAlign='center'>{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Typography
                variant='h5'
                noWrap
                component='a'
                href=''
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                LOGO
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={closeUserMenu}
                    sx={{ color: 'white' }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title='Settings'>
                  <IconButton onClick={openUserMenu} sx={{ p: 0 }}>
                    <Avatar />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id='menu-appbar'
                  anchorEl={userMenu}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(userMenu)}
                  onClose={closeUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={closeUserMenu}>
                      <Typography textAlign='center'>{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      ) : (
        <div></div>
      )}
    </>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    user: state.auth,
  };
};
