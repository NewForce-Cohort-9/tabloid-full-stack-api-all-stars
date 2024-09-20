import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from "reactstrap";
import { updateComment } from "../../Managers/CommentManager.js";

function UpdateComment({ args, comment }) {
  const [modal, setModal] = useState(false);

  const [updatedComment, setUpdatedComment] = useState({ ...comment });

  const toggle = () => setModal(!modal);

  const handleUpdate = () => {
    const editedComment = {
      id: updatedComment.id,
      postId: updatedComment.postId,
      userProfileId: updatedComment.userProfileId,
      subject: updatedComment.subject,
      content: updatedComment.content,
      createDateTime: updatedComment.createDateTime,
    };

    updateComment(editedComment).then(() => {
      document.location.reload();
    });
  };

  return (
    <div>
      <Button color="info" onClick={toggle}>
        Edit
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Edit Comment</ModalHeader>
        <ModalBody>
          <Label>Subject</Label>
          <Input
            type="text"
            value={updatedComment.subject || ""}
            onChange={(event) => {
              setUpdatedComment({
                ...updatedComment,
                subject: event.target.value,
              });
            }}
          />
          <Label>Content</Label>
          <Input
            type="textarea"
            value={updatedComment.content || ""}
            onChange={(event) => {
              setUpdatedComment({
                ...updatedComment,
                content: event.target.value,
              });
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdate}>
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

export default UpdateComment;
