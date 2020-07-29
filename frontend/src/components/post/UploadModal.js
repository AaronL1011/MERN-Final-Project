import React from 'react';
import NewUpload from './NewUpload';
import { Modal } from '@material-ui/core';

const UploadModal = ({ modalState, handleModalChange }) => {
  return (
    <Modal
      open={modalState}
      onClose={handleModalChange}
      aria-labelledby='New-Upload-Modal'
      aria-describedby='Form-Modal-For-New-Post'
    >
      <NewUpload toggleModal={handleModalChange} />
    </Modal>
  );
};

export default UploadModal;
