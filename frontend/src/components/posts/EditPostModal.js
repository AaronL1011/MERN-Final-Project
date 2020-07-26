import React from 'react';
import UpdatePostForm from './UpdatePostForm';
import { Modal } from '@material-ui/core';

const EditPostModal = ({
  modalState,
  handleModalChange,
  handleRefresh,
  currentDetails
}) => {
  const { id, caption, tags, visibility } = currentDetails;
  return (
    <Modal
      open={modalState}
      onClose={handleModalChange}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      // style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
    >
      <UpdatePostForm
        toggleModal={handleModalChange}
        handleRefresh={handleRefresh}
        postId={id}
        current_caption={caption}
        current_tags={tags}
        current_visibility={visibility}
      />
    </Modal>
  );
};

export default EditPostModal;
