import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  boxStyle: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const Spinner = () => {
  const classes = useStyles();

  return (
    <Box className={classes.boxStyle}>
      <CircularProgress />
    </Box>
  );
};

export default Spinner;
