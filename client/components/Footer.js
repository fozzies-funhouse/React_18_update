import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Container';
import { Login } from './AuthForm';
import { Signup } from './SignUpForm';

const Footer = (props) => {
  const helpOptions = ['Contact', 'Support', 'Privacy'];
  const accountOptions = ['Login', 'Signup'];
  const year = new Date().getFullYear()
  return (
    <footer
      style={{ background: 'rgba(0,0,0,0.8)', color: 'white', marginTop: 50  }}
    >
      <Box>
        <Container sx={{ display: 'flex' }}>
          <Box sx={{ flexDirection: 'row' }}>
            <Box sx={{ borderBottom: '1px solid white' }}>Help</Box>
            {helpOptions.map((option) => (
              <Box>{option}</Box>
            ))}
          </Box>
          <Box sx={{ flexDirection: 'row' }}>
            <Box sx={{ borderBottom: '1px solid white' }}>Account</Box>
            {accountOptions.map((option) => (
              <Box>{option}</Box>
            ))}
          </Box>
        </Container>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          Copyright &reg; {year} Hot Kicks Inc. All rights
          reserved.
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
