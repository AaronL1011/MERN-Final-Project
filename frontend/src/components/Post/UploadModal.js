import React from 'react';
import NewUpload from './NewUpload';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  modalDiv: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const UploadModal = ({ modalState, handleModalChange }) => {
  const classes = useStyles();

  return (
    <Modal
      open={modalState}
      onClose={handleModalChange}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      // style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
    >
      <NewUpload toggleModal={handleModalChange} />
    </Modal>
  );
};

export default UploadModal;
