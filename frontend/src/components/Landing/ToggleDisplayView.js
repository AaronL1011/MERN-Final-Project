import React, { useState } from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ViewDayIcon from "@material-ui/icons/ViewDay";
import ViewModuleIcon from "@material-ui/icons/ViewModule";

const ToggleDisplayView = () => {
  const [displayView, setDisplayView] = useState("single");

  const handleDisplayView = (event, newDisplayView) => {
    if (newDisplayView !== null) {
      setDisplayView(newDisplayView);
    }
  };

  return (
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
  );
};

export default ToggleDisplayView;
