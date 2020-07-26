import React from 'react';
import ModalPostCard from './ModalPostCard';
import { Modal } from '@material-ui/core';

const PostModal = ({ modalState, handleModalChange, modalContent }) => {
  return (
    <Modal
      open={modalState}
      onClose={handleModalChange}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      // style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
    >
      <ModalPostCard
        postContent={modalContent}
        handleModalChange={handleModalChange}
      />
    </Modal>
  );
};

export default PostModal;
