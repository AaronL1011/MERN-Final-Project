import React, { useContext } from 'react';
import { Card, Button, Typography, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import UserContext from '../../context/UserContext';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    maxWidth: '100%',
    paddingTop: 10,
    paddingBottom: 10
  },
  actionArea: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: 600
  },
  profile_pic: {
    width: 200,
    height: 200
  },
  content: {
    flexWrap: 'wrap',
    flexDirection: 'column',
    justify: 'center',
    alignItems: 'center',
    maxWidth: '100%'
  }
});

const ProfileCard = ({ userProfile }) => {
  const { userData } = useContext(UserContext);
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Avatar
        className={classes.profile_pic}
        alt=''
        src={userProfile.profilePicture}
      />
      <CardActionArea className={classes.actionArea}>
        <CardContent className={classes.content}>
          <CardActions>
            {userData.user && userData.user.id === userProfile.id ? (
              <Button color='primary' component={Link} to='/editprofile'>
                Edit Profile
              </Button>
            ) : (
              <Button
                color='primary'
                component='a'
                href={`mailto:${userProfile.email}`}
              >
                Email
              </Button>
            )}
          </CardActions>
          <Typography variant='h4' component='h2'>
            {userProfile.username}
          </Typography>
          <Typography variant='body1' color='textPrimary' component='p'>
            {userProfile.bio}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProfileCard;
