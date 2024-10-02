import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { addSubscription } from "../../Managers/SubscriptionManager.js";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../../Managers/PostManager.js";

function AddNewSubscription({ args, currentUser }) {
  const [modal, setModal] = useState(false);
  const [postDetails, setPostDetails] = useState({});
  const toggle = () => setModal(!modal);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(id).then((postObj) => setPostDetails(postObj));
  }, [id]);

  const handleSave = (event) => {
    event.preventDefault();
    const subscriptionObj = {
      subscriberUserProfileId: currentUser.id,
      providerUserProfileId: postDetails?.userProfileId,
    };

    addSubscription(subscriptionObj).then(() => {
      navigate("/Subscriptions");
    });
  };

  return (
    <div>
      <Button color="info" onClick={toggle}>
        Subscribe
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Confirm Subscribe</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to subscribe to this user?</p>
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

export default AddNewSubscription;
