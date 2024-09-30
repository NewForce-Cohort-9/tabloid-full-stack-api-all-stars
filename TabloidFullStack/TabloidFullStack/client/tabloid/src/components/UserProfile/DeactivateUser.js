import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Container, ListGroupItemHeading } from "reactstrap"
import { getUserById, updateUser } from "../../Managers/UserProfileManager.js";

export const DeactivateUser = () => {

    const [user, setUser] = useState({});

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
              deactivated: true
          }
  
          updateUser(editedUser)
          .then(() => {
              navigate(`/users/deactivated`)
          })
      }

    return(
        <Container>
            <ListGroupItemHeading>
                Are you sure you want to DEACTIVATE {user.displayName}???
            </ListGroupItemHeading>
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