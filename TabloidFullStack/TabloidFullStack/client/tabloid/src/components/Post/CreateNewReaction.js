import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from "reactstrap";
import {
  addReaction,
  getAllReactions,
} from "../../Managers/ReactionManager.js";

function CreateNewReaction({ args }) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [reactions, setReactions] = useState([]);
  const [reaction, setReaction] = useState({});

  useEffect(() => {
    getAllReactions().then((reactionArr) => setReactions(reactionArr));
  }, []);

  const handleSave = (event) => {
    event.preventDefault();
    const reactionObj = {
      name: reaction.name,
      imageLocation: reaction.imageLocation,
    };

    addReaction(reactionObj).then(() => {
      document.location.reload();
    });
  };

  return (
    <div>
      <Button color="info" onClick={toggle}>
        Create New Reaction
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Create New Reaction</ModalHeader>
        <ModalBody>
          <p>Current Reactions:</p>
          {reactions.map((reaction) => (
            <div key={reaction.id}>
              <img
                src={reaction.imageLocation}
                title={reaction.name}
                width="25px"
                height="auto"
              />{" "}
            </div>
          ))}
          <hr />
          <Label>New Reaction Name</Label>
          <Input
            name="name"
            onChange={(event) => {
              const reactionObj = { ...reaction };
              reactionObj.name = event.target.value;
              setReaction(reactionObj);
            }}
          />
          <Label>Image Url</Label>
          <Input
            name="imageLocation"
            onChange={(event) => {
              const reactionObj = { ...reaction };
              reactionObj.imageLocation = event.target.value;
              setReaction(reactionObj);
            }}
          />
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

export default CreateNewReaction;
