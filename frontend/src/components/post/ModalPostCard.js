import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography
} from '@material-ui/core';
import TagChips from './TagChips';
import { useHistory } from "react-router-dom";
import { handleNameClick } from "./utils/profileUtils";

// Styling
const useStyles = makeStyles({
  container: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  root: {
    maxWidth: 1000,
    maxHeight: '90vh'
  },
  caption: {
    maxheight: '30vh',
    minHeight: '3rem',
    zIndex: '20',
    bottomMargin: 0
  },
  imageBox: {
    height: '50vh',
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center'
  },
  image: {
    height: '100%'
  }
});

// Helper method
const arrayToChipData = (array) => {
  let output = [];
  array.forEach(function (tagString) {
    output.push({ key: array.indexOf(tagString), label: tagString });
  });
  return output;
};

const ModalPostCard = ({ postContent, handleModalChange }) => {
  const classes = useStyles();
  let history = useHistory();

  return (
    <Box className={classes.container} onClick={handleModalChange}>
      <Card className={classes.root} onclick={(e) => e.preventDefault()}>
        <CardActionArea onclick={(e) => e.preventDefault()}>
          <Box className={classes.imageBox}>
            <img
              src={postContent.images[0]}
              className={classes.image}
              alt={postContent.caption}
            />
          </Box>
          </CardActionArea>
          <CardContent className={classes.caption}>
            {postContent.tags && (
              <TagChips tagsArray={arrayToChipData(postContent.tags)} />
            )}
            <Typography onClick={event =>{handleNameClick(event, history, postContent.authorURL)}}>{postContent.displayName}</Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {postContent.caption}
            </Typography>
          </CardContent>
      </Card>
    </Box>
  );
};

export default ModalPostCard;
