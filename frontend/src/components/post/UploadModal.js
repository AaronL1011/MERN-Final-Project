import React from 'react';
import NewUpload from './NewUpload';
import { Modal } from '@material-ui/core';

const UploadModal = ({ modalState, handleModalChange }) => {
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
