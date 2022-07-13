import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import Cart from "./Cart";
import { style } from "./Utils/navUtils";

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { Login } from "./AuthForm";

const Navigation = ({ handleLogout, isLoggedIn }) => {
  const [userMenu, setUserMenu] = useState(false);
  const openUserMenu = (event) => setUserMenu(event.currentTarget);
  const closeUserMenu = () => setUserMenu(null);

  const loggedInView = () => {
    const pages = ["Products"];
    return (
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to="/" {...style.navLink}>
              <Typography {...style.logo}>LOGO Placeholder</Typography>
            </Link>
            <Box {...style.pageBox}>
              {pages.map((page) => (
                <Link
                  to={page.toLowerCase()}
                  key={page}
                  onClick={closeUserMenu}
                  {...style.navLink}
                >
                  <Typography>{page}</Typography>
                </Link>
              ))}
            </Box>
            <Box sx={{ display: "flex" }}>
              <Tooltip title="Settings">
                <IconButton onClick={openUserMenu} sx={{ p: 0 }}>
                  <Avatar />
                </IconButton>
              </Tooltip>
              <Menu
                {...style.menu}
                onClose={closeUserMenu}
                open={Boolean(userMenu)}
                anchorEl={userMenu}
              >
                <MenuItem onClick={closeUserMenu}>
                  <Link to="/home" {...style.link}>
                    <Typography textAlign="center">Profile</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={closeUserMenu}>
                  <Link to="/" {...style.link} onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
            <Cart />
          </Toolbar>
        </Container>
      </AppBar>
    );
  };

  const guestView = () => {
    return (
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to="/" {...style.navLink}>
              <Typography {...style.logo}>LOGO Placeholder</Typography>
            </Link>
            <Box {...style.pageBox}>
              <Link to="products" onClick={closeUserMenu} {...style.navLink}>
                <Typography>Products</Typography>
              </Link>
              <Login />
            </Box>
            <Cart />
          </Toolbar>
        </Container>
      </AppBar>
    );
  };

  return isLoggedIn ? loggedInView() : guestView();
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
          "cart",
          JSON.stringify({ cart_details: [] })
        );
      }
    },
  };
};

export default connect(mapState, mapDispatch)(Navigation);
