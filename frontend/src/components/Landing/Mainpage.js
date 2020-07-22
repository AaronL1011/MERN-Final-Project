import React from "react";
import { Container, Grid} from "@material-ui/core";

import Searchbar from "./Searchbar";
import ToggleDisplayView from './ToggleDisplayView'

const Mainpage = () => {
    return (
      <Container>
        <Grid
          container
          direction="column"
          justify="flex-start"
          align="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid 
            item
          ><Searchbar />
          </Grid>
          <Grid item>
              <ToggleDisplayView />
          </Grid>
          <Grid item>#TODO Display contentcards here</Grid>
          
        </Grid>
      </Container>
    );
};

export default Mainpage;