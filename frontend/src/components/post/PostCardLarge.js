import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import { deletePost } from "../../utils/post";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import UserContext from "../../context/UserContext";
import EditPostModal from "./EditPostModal";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import TagChips from "./TagChips";
import { useHistory } from "react-router-dom";
import { handleNameClick } from './utils/profileUtils'

// Styling
const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    maxHeight: "80vh",
  },
  caption: {
    maxheight: "30vh",
    minHeight: "3rem",
    zIndex: "20",
    bottomMargin: 0,
  },
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
  userData,
  openModal,
  closeModal,
  searchValue,
  setSearchValue,
  tagSearchEnabled
}) => {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { refresh, setRefresh } = useContext(UserContext);
  let history = useHistory();
  
  const handleDialogClick = () => {
    setOpen(!open);
  };

  const handleEditModalState = () => {
    setEditModalOpen(!editModalOpen);
  };

  const onDelete = async () => {
    const response = await deletePost(postContent._id, userData.token);
    if (response.id) {
      enqueueSnackbar(response.message, {
        variant: "success",
      });
      setRefresh(!refresh);
      closeModal();
    } else {
      enqueueSnackbar("Hmmm... Something went wrong!", {
        variant: "error",
      });
    }
  };
  

  // const onEdit = async () => {
  //   const response = await updatePost(
  //     postContent._id,
  //     userData.token,
  //     postData
  //   );

  //   if (response._id) {
  //     enqueueSnackbar(response.message, {
  //       variant: 'success'
  //     });
  //     handleRefresh();
  //   } else {
  //     enqueueSnackbar('Hmmm... Something went wrong!', {
  //       variant: 'error'
  //     });
  //   }
  // };

  const classes = useStyles();
  return (
    <>
      <Dialog open={open} onClose={handleDialogClick}>
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post? This is permanent!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDialogClick} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDialogClick();
              onDelete();
            }}
            color="primary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Card className={classes.root}>
        <CardActionArea onClick={openModal}>
          <CardMedia
            component="img"
            image={postContent.images[0]}
            width="100%"
            style={{ maxHeight: "50vh" }}
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
              handleNameClick(event, history, postContent.authorURL);
            }}
          >
            {postContent.displayName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {postContent.caption}
          </Typography>
          {userData.user && userData.user.id === postContent.authorID && (
            <Box
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                paddingTop: 10,
              }}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleDialogClick}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleEditModalState}
              >
                Edit
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
      <EditPostModal
        modalState={editModalOpen}
        handleModalChange={handleEditModalState}
        currentDetails={{
          id: postContent._id,
          tags: postContent.tags,
          caption: postContent.caption,
          visibility: postContent.visibility,
        }}
      />
    </>
  );
};

export default PostCardLarge;
