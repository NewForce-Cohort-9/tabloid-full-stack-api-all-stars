import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { deleteComment } from "../../Managers/CommentManager.js";

function DeleteComment({ args, comment }) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleDelete = () => {
    deleteComment(comment.id).then(document.location.reload());
  };

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        Delete
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this comment? <br /> <br />
          SUBJECT: {comment?.subject} <br /> CONTENT: {comment?.content}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleDelete}>
            Confirm
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DeleteComment;
