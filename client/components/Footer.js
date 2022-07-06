import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = (props) => {
  return (
    <BottomNavigation
      showLabels
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
      }}
    >
      <BottomNavigationAction label='Facebook' icon={<FacebookIcon />} />
      <BottomNavigationAction label='Instagram' icon={<InstagramIcon />} />
      <BottomNavigationAction label='Twitter' icon={<TwitterIcon />} />
      <BottomNavigationAction label='LinkedIn' icon={<LinkedInIcon />} />
    </BottomNavigation>
  );
};

export default Footer;
