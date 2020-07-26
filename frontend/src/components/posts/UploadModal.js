import React from 'react';
import NewUploadForm from './NewUpload';
import { Modal } from '@material-ui/core';

const UploadModal = ({ modalState, handleModalChange, handleRefresh }) => {
  return (
    <Modal
      open={modalState}
      onClose={handleModalChange}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      // style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
    >
      <NewUploadForm
        toggleModal={handleModalChange}
        handleRefresh={handleRefresh}
      />
    </Modal>
  );
};

export default UploadModal;
