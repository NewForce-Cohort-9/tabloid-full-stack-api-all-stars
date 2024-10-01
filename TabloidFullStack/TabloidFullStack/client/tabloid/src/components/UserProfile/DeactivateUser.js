import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { Button, Container, ListGroupItemHeading, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { getUserById, updateUser } from "../../Managers/UserProfileManager.js";

export const DeactivateUser = () => {
    const [modal, setModal] = useState(false)

    const toggle = () => setModal(!modal);

    const [user, setUser] = useState({});
    const { state } = useLocation()

    const { userId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        getUserById(userId).then(userObj => setUser(userObj))
    }, [userId])
  
  
      const handleDeactivate = () => {
          const editedUser = {
              id: user.id,
              userTypeId: user.userTypeId,
              email: user.email,
              lastName: user.lastName,
              firstName: user.firstName,
              displayName: user.displayName,
              demoteVotes: user.demoteVotes,
              deactivateVotes: user.deactivateVotes
            }
        if (state.adminCount === 1 && editedUser.userTypeId === 1) {
            toggle()
        } else {
            if (editedUser.userTypeId === 1) {
                editedUser.deactivateVotes++

                if (editedUser.deactivateVotes === 2) {
                    editedUser.deactivated = true
    
                    updateUser(editedUser)
                    .then(() => {
                        navigate(`/users/deactivated`)
                    })
                } else {
                    updateUser(editedUser)
                    .then(() => {
                        navigate(`/users/deactivated`)
                    })
                }
            } else {
                updateUser(editedUser)
                .then(() => {
                    navigate(`/users/deactivated`)
                })
            }
        }    
      }

    return(
        <Container>
            <ListGroupItemHeading>
                Are you sure you want to DEACTIVATE {user.displayName}???
            </ListGroupItemHeading>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Admin Error</ModalHeader>
                <ModalBody>
                    Cannot deactivate last admin user. Must reactivate another admin user before deactivation is allowed.
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
            <Button
            color="warning"
            size="sm"
            onClick={() => {navigate(`/users`)}}
            >
                Nevermind!
            </Button>
            <Button
            color="danger"
            size="sm"
            onClick={handleDeactivate}
            >
                DEACTIVATE
            </Button>
        </Container>
    )
}