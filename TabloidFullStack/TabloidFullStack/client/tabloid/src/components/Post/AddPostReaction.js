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
import { useNavigate, useParams } from "react-router-dom";

function AddReactionToPost({ args }) {
  const [modal, setModal] = useState(false);
  const [postReaction, setPostReaction] = useState({});
  const navigate = useNavigate();
  const toggle = () => setModal(!modal);
  const { id } = useParams();

  const handleSave = (event) => {
    event.preventDefault();

    const singlePostReaction = {
      postId: parseInt(id),
      reactionId: postReaction.reactionId,
      userProfileId: postReaction.userProfileId
    };

    AddReactionToPost(singlePostReaction).then((c) => {
      navigate(`/posts/${id}`);
    });
  };

  return (
    <div>
      <Button color="info" onClick={toggle}>
        Add Reaction
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Add Reaction</ModalHeader>
        <ModalBody>
          
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>
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

export default AddReactionToPost;
