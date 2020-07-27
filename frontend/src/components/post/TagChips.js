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

const TagChips = ({
  searchValue,
  setSearchValue,
  tagsArray,
  tagSearchEnabled
}) => {
  const classes = useStyles();

  const handleTagClick = (e, tag) => {
    if (tagSearchEnabled) {
      e.preventDefault();
      if (tag === searchValue) {
        setSearchValue('');
      } else {
        setSearchValue(tag);
      }
    }
  };

  return (
    <div component='ul' className={classes.root}>
      {tagsArray.map((data) => {
        return (
          <li key={data.key}>
            <Chip
              label={data.label}
              className={classes.chip}
              onClick={(event) => {
                handleTagClick(event, data.label);
              }}
            />
          </li>
        );
      })}
    </div>
  );
};

export default TagChips;
