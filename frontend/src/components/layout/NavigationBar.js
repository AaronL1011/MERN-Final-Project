import React, { useState, useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
  Menu,
  MenuItem,
  Grid,
  BottomNavigation,
  BottomNavigationAction
} from '@material-ui/core';
import { Home, Publish, Person } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Fade from '@material-ui/core/Fade';
import UserContext from '../../context/UserContext';

// Styles
const useStyles = makeStyles({
  navBox: {
    width: '100%',
    position: 'fixed',
    bottom: '30px',
    zIndex: '10',
    justifyContent: 'center'
  },
  bottomNav: {
    width: '100%',
    background: '#f7f7f7',
    boxShadow: '12px 12px 30px #cfcfcf',
    borderRadius: '10px',
    zIndex: '10'
  }
});

const NavigationBar = ({ modalToggle }) => {
  const location = useLocation();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { userData, setUserData } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState('home');
  const [anchorElement, setAnchorElement] = useState('');
  const isOpen = Boolean(anchorElement);
  const history = useHistory();
  const userProfileLink = userData.user
    ? `/profile/${userData.user.url}`
    : '/login';

  const profileRegexCheck = /\A(\/profile\/)/;

  const handleChange = () => {
    console.log(location.pathname);
    if (location.pathname === '/') {
      setCurrentPage('home');
    } else if (
      location.pathname.match(profileRegexCheck) ||
      location.pathname === '/editprofile'
    ) {
      setCurrentPage('profile');
    } else if (
      location.pathname === '/signup' ||
      location.pathname === '/login'
    ) {
      setCurrentPage('menu');
    }
  };

  const onMenuClick = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const menuExit = () => {
    setAnchorElement(null);
  };

  const login = () => {
    history.push('/login');
  };

  const signup = () => {
    history.push('/signup');
  };

  const about = () => {
    history.push('/about');
  };

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined
    });
    localStorage.setItem('jwt', '');
    enqueueSnackbar(`You're logged out!`, {
      variant: 'info'
    });
  };

  return (
    <Grid container className={classes.navBox}>
      {userData.user ? (
        <Menu
          id='fade-menu'
          anchorEl={anchorElement}
          keepMounted
          open={isOpen}
          onClose={menuExit}
          TransitionComponent={Fade}
        >
          <MenuItem
            onClick={() => {
              about();
              menuExit();
            }}
          >
            About
          </MenuItem>
          <MenuItem
            onClick={() => {
              logout();
              menuExit();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      ) : (
        <Menu
          id='fade-menu'
          anchorEl={anchorElement}
          keepMounted
          open={isOpen}
          onClose={menuExit}
          TransitionComponent={Fade}
        >
          <MenuItem
            onClick={() => {
              about();
              menuExit();
            }}
          >
            About
          </MenuItem>
          <MenuItem
            onClick={() => {
              login();
              menuExit();
            }}
          >
            Login
          </MenuItem>
          <MenuItem
            onClick={() => {
              signup();
              menuExit();
            }}
          >
            Sign Up
          </MenuItem>
        </Menu>
      )}
      <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
        <BottomNavigation
          value={currentPage}
          onChange={(event, value) => handleChange(event, value)}
          className={classes.bottomNav}
        >
          <BottomNavigationAction
            component={Link}
            to='/'
            label='Home'
            value='home'
            icon={<Home />}
          />
          <BottomNavigationAction
            onClick={modalToggle}
            label='Upload'
            value='new-upload'
            icon={<Publish />}
          />
          <BottomNavigationAction
            component={Link}
            to={userProfileLink}
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

export default NavigationBar;
