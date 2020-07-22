import React, { useState } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";



const Searchbar = () => {
  const [searchText, setSearchText] = useState("");

  const runSearch = (text) => {
    console.log(`Search text: ${text}`);
  };

  const searchInput = (e) => {
    if (e.keyCode === 13 && 
      document.activeElement.id === "searchBarText") {
      runSearch(searchText);
    }
  };

  return (
    <Grid container direction="row" alignItems="center" justify="center">
      <Grid item xs={11} sm={9} md={6} >
        <TextField
          fullWidth
          variant="outlined"
          id="searchBarText"
          label="Search"
          autoComplete="on"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          onKeyUp={(e) => {
            searchInput(e);
          }}
        />
      </Grid>
      <Grid item sm={1}  aligncontent="center">
        <Button
          onClick={(event) => {
            runSearch(searchText);
          }}
        >
          <SearchIcon />
        </Button>
      </Grid>
    </Grid>
  );
};

export default Searchbar;
