import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  MenuItem,
  Grid,
  BottomNavigation,
  BottomNavigationAction
} from '@material-ui/core';
import { Home, Publish, Person } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import Fade from '@material-ui/core/Fade';

const NavigationBar = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [anchorElement, setAnchorElement] = useState('');
  const isOpen = Boolean(anchorElement);

  const handleChange = (event, value) => {
    if (value !== 'menu') {
      setCurrentPage(value);
    }
  };

  const onMenuClick = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const menuExit = () => {
    setAnchorElement(null);
  };

  return (
    <Grid container style={styles.navBox} justify='center'>
      <Menu
        id='fade-menu'
        anchorEl={anchorElement}
        keepMounted
        open={isOpen}
        onClose={menuExit}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={menuExit}>Something</MenuItem>
        <MenuItem onClick={menuExit}>Something Else</MenuItem>
        <MenuItem onClick={menuExit}>Logout</MenuItem>
      </Menu>
      <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
        <BottomNavigation
          value={currentPage}
          onChange={(event, value) => handleChange(event, value)}
          style={styles.bottomNav}
        >
          <BottomNavigationAction
            component={Link}
            to='/'
            label='Home'
            value='home'
            icon={<Home />}
          />
          <BottomNavigationAction
            component={Link}
            to='/upload'
            label='New Upload'
            value='new-upload'
            icon={<Publish />}
          />
          <BottomNavigationAction
            component={Link}
            to='/editprofile'
            label='Profile'
            value='profile'
            icon={<Person />}
          />
          <BottomNavigationAction
            onClick={onMenuClick}
            label='Menu'
            value='menu'
            icon={<MenuIcon />}
          />
        </BottomNavigation>
      </Grid>
    </Grid>
  );
};

const styles = {
  navBox: {
    width: '100%',
    position: 'fixed',
    bottom: '30px'
  },
  bottomNav: {
    width: '100%',
    background: '#f7f7f7',
    boxShadow: '12px 12px 30px #cfcfcf, -12px -12px 30px #ffffff',
    borderRadius: '10px',
    zIndex: '10'
  }
};

export default NavigationBar;