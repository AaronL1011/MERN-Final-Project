import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

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

// TODO Update with tag search query url 
const handleTagClick = (e, tag) => {
  e.preventDefault();
  console.log(`Tag: '${tag}' clicked`);
}

const TagChips = (props) => {
  const classes = useStyles();
  return (
    <div component='ul' className={classes.root}>
      {props.tagsArray.map((data) => {
        return (
          <li key={data.key}>
            <Chip label={data.label} className={classes.chip} onClick={event => {handleTagClick(event, data.label)}}/>
          </li>
        );
      })}
    </div>
  );
};

export default TagChips;
