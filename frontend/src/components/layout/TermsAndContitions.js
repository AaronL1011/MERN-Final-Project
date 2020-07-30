import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minHeight: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background:
      'url(https://images.unsplash.com/photo-1595766711576-393e79ec6302?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  container: {
    minHeight: '60%',
    width: '100vw',
    padding: 25,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    boxShadow: '0 0 20px black',
    background: '#fff',
    marginBottom: 100
  },
  link: {
    marginTop: 40,
    color: '#696969',
    textDecoration: 'none'
  },
  heading: {
    marginBottom: 40
  },
  textBox: {
    maxWidth: 800
  }
});
const TermsAndConditions = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Box className={classes.textBox}>
          <Typography variant='h3' className={classes.heading}>
            Terms and Conditions
          </Typography>
          <Typography variant='body1'>
            As a condtion of use, you promise not to use this service for any
            purpose that is unlawful or prohibited by these Terms, or any other
            purpose not reasonably intended by GrupGrup. By way of example, and
            not as a limitation, you agree not to use GrupGrup: 1. To abuse,
            harass, threaten, impersonate or intimidate any person. 2. To post
            or trasmit, or cause to be posted or transmitted, any content that
            is libelous, defamatory, obscene, pornographic, abusive, offensive,
            profane or that infringes any copyright. 3. For any purpose that is
            not permitted under the laws of the jurisdiction where you use
            GrupGrup. 4. To post or transmit, or cause to be posted or
            transmitted, any communication designed or intended to obtain
            password, account or private information from any GrupGrup user. 5.
            To create or transmit unwanted 'spam' to any person or any URL. 6.
            To create multiple accounts for malicious purposes. 8. To post
            content that does not belong to you unless approved by and providing
            appropriate credit to the copyright owner. Content rights and
            copyright is applicable to all content provided by a user, and each
            user has full rights to their own original content. As a user, you
            acknowledge that due to GrupGrup being a project built for
            assessment purposes, at any given point in time the service may be
            suspended and your data deleted without forewarning.
          </Typography>
        </Box>
        <Link to='/signup' className={classes.link}>
          Back to Create Account
        </Link>
      </Box>
    </Box>
  );
};

export default TermsAndConditions;
