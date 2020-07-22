import React, { useState } from 'react';
import { Box, TextField, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const Searchbar = () => {
    const [searchText, setSearchText] = useState('');

    return (
      <Box component="span">
        <TextField 
            variant="outlined"
            id="searchbartext" 
            label="Search"
            autoComplete="on"
            onChange={e => {setSearchText(e.target.value)}}
        />
        <Button>
            <SearchIcon />
        </Button>
      </Box>
    );
};

export default Searchbar;