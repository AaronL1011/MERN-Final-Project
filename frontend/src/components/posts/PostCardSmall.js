import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
  root: {
    width: 250,
    height: 250,
    overflow: 'hidden',
    margin: 15
  },
  media: {
    minHeight: 250
  }
});

const PostCardSmall = ({ postContent, openModal }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={openModal}>
        <CardMedia
          component='img'
          image={postContent.images[0]}
          className={classes.media}
        />
      </CardActionArea>
    </Card>
  );
};

export default PostCardSmall;
