import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Card } from '@material-ui/core';

import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import TagChips from './TagChips';
import { useHistory } from 'react-router-dom';

// Styling
const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    maxHeight: '80vh'
  },
  caption: {
    maxheight: '30vh',
    minHeight: '3rem',
    zIndex: '20',
    bottomMargin: 0
  },
  cardMedia: {
    width: '100%',
    maxHeight: '50vh'
  },
  buttonBox: {
    display: 'flex',
    justifyContent: 'space-evenly',
    paddingTop: 10
  },
  displayNameStyle: { cursor: 'pointer', display: 'inline-block' }
});

// Helper method
const arrayToChipData = (array) => {
  let output = [];
  array.forEach(function (tagString) {
    output.push({ key: array.indexOf(tagString), label: tagString });
  });
  return output;
};

const PostCardLarge = ({
  postContent,
  openModal,
  searchValue,
  setSearchValue,
  tagSearchEnabled
}) => {
  const history = useHistory();

  const handleNameClick = (event) => {
    event.preventDefault();
    history.push(`/profile/${postContent.authorURL}`);
  };

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={openModal}>
        <CardMedia
          component='img'
          image={postContent.images[0]}
          className={classes.cardMedia}
        />
      </CardActionArea>
      <CardContent className={classes.caption}>
        {postContent.tags && (
          <TagChips
            tagsArray={arrayToChipData(postContent.tags)}
            tagSearchEnabled={tagSearchEnabled}
            setSearchValue={setSearchValue}
            searchValue={searchValue}
          />
        )}
        <Typography
          onClick={(event) => {
            handleNameClick(event);
          }}
          className={classes.displayNameStyle}
        >
          {postContent.displayName}
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          {postContent.caption}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostCardLarge;
