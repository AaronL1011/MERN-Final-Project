import React from 'react';
import { Box, Grid, CircularProgress } from '@material-ui/core';

const Spinner = () => {
  return (
    <Box height='100%' display='flex' alignItems='center'>
      <Grid
        container
        direction='column'
        alignItems='center'
        justify='center'
        spacing={1}
      >
        <Grid item padding={0}>
          <CircularProgress />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Spinner;
