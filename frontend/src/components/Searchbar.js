import React, { useState } from "react";
import { Grid, Box, TextField, Button } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import SearchIcon from "@material-ui/icons/Search";
import ViewDayIcon from "@material-ui/icons/ViewDay";
import ViewModuleIcon from "@material-ui/icons/ViewModule";

const Searchbar = () => {
  const [searchText, setSearchText] = useState("");
  const [displayView, setDisplayView] = useState("single");

  const runSearch = (text) => {
    console.log(`${text}`);
  };

  const handleDisplayView = (event, newDisplayView) => {
    if (newDisplayView !== null) {
      setDisplayView(newDisplayView);
    }
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="space-between"
    >
      <Grid item>
        <TextField
          variant="outlined"
          id="searchbartext"
          label="Search"
          autoComplete="on"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <Button
          onClick={(event) => {
            runSearch(searchText);
          }}
        >
          <SearchIcon />
        </Button>
      </Grid>

      <Grid item>
        <ToggleButtonGroup
          value={displayView}
          exclusive
          onChange={handleDisplayView}
          aria-label="display alignment"
        >
          <ToggleButton
            value="single"
            aria-label="display results in single column"
          >
            <ViewDayIcon />
          </ToggleButton>
          <ToggleButton
            value="multiple"
            aria-label="display results in multiple columns"
          >
            <ViewModuleIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
};

export default Searchbar;
