import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}));

const TagChips = (props) => {
  const classes = useStyles();
  return (
    <div component='ul' className={classes.root}>
      {props.tagsArray.map((data) => {
        return (
          <li key={data.key}>
            <Chip label={data.label} className={classes.chip} />
          </li>
        );
      })}
    </div>
  );
};

export default TagChips;
