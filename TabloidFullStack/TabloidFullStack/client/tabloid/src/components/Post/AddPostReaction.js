import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { getAllReactions } from "../../Managers/ReactionManager.js";
import { addPostReaction } from "../../Managers/PostReactionManager.js";
import { useParams } from "react-router-dom";

function AddReactionToPost({ args, currentUser }) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [reactions, setReactions] = useState([]);
  const [selectedReaction, setSelectedReaction] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getAllReactions().then((reactionArr) => setReactions(reactionArr));
  }, []);

  const handleReactionClick = (reactionId) => {
    setSelectedReaction(reactionId);
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (selectedReaction) {
      const postReactionObj = {
        postId: parseInt(id),
        reactionId: parseInt(selectedReaction),
        userProfileId: currentUser?.id,
      };

      addPostReaction(postReactionObj).then(() => {
        document.location.reload();
      });
    } else window.alert("Please select a reaction first!");
  };

  return (
    <div>
      <Button color="info" onClick={toggle}>
        Add Reaction
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Add Reaction</ModalHeader>
        <ModalBody>
          {reactions.map((reaction) => (
            <div key={reaction.id}>
              <img
                src={reaction.imageLocation}
                title={reaction.name}
                width="25px"
                height="auto"
                onClick={() => handleReactionClick(reaction.id)}
                style={{
                  border:
                    selectedReaction === reaction.id
                      ? "2px solid blue"
                      : "none",
                  cursor: "pointer",
                }}
              />{" "}
            </div>
          ))}
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
