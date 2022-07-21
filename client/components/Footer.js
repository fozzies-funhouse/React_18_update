import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Container';
import { Login } from './AuthForm';
import { Signup } from './SignUpForm';

const Footer = (props) => {
  const helpOptions = [
    { name: 'Contact', link: 'https://www.linkedin.com/in/allahjackson' },
    {
      name: 'Support',
      link: 'https://www.linkedin.com/in/christian-bermeo-679023185/',
    },
    { name: 'Privacy', link: 'https://www.linkedin.com/in/leland-kowal/' },
    { name: 'Feedback', link: 'https://www.linkedin.com/in/mahmoud-samori/' },
  ];
  const accountOptions = ['Login', 'Signup'];
  const year = new Date().getFullYear();
  return (
    <footer
      style={{ background: 'rgba(0,0,0,0.8)', color: 'white', marginTop: 50 }}
    >
      <Box>
        <Container sx={{ display: 'flex' }}>
          <Box sx={{ flexDirection: 'row' }}>
            <Box sx={{ borderBottom: '1px solid white' }}>Help</Box>
            {helpOptions.map((option, idx) => (
              <Box key={idx}>
                <a
                  href={option.link}
                  target='_blank'
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  {option.name}
                </a>
              </Box>
            ))}
          </Box>
          <Box sx={{ flexDirection: 'row' }}>
            <Box sx={{ borderBottom: '1px solid white' }}>Account</Box>
            {accountOptions.map((option, key) => (
              <Box key={idx}>{option}</Box>
            ))}
          </Box>
        </Container>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          Copyright &reg; {year} Hot Kicks Inc. All rights reserved.
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
