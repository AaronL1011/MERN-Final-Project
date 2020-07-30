import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  containerStyle: {
    paddingTop: '30px'
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  flexCentered: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  link: {
    color: '#696969',
    textDecoration: 'none'
  }
});

const Searchbar = ({ searchValue, setSearchValue }) => {
  // const searchInput = (e) => {
  //   if (e.keyCode === 13 && document.activeElement.id === 'searchBarText') {
  //     filterResults();
  //   }
  // };
  const classes = useStyles();

  return (
    <Grid container className={classes.gridContainer}>
      <Grid item xs={11} sm={9} md={6}>
        <TextField
          fullWidth
          variant='outlined'
          id='search-bar'
          label='Search'
          autoComplete='on'
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          // onKeyUp={(e) => {
          //   searchInput(e);
          // }}
        />
      </Grid>
      {/* <Grid item sm={1} aligncontent='center'>
        <Button onClick={() => filterResults()}>
          <SearchIcon />
        </Button>
      </Grid> */}
    </Grid>
  );
};

export default Searchbar;
