import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getUserById, updateUserType } from "../../Managers/UserProfileManager.js";
import { Button, Container, Form, Input, ListGroupItemHeading } from "reactstrap";

export const UserEditType = () => {
    
    const [user, setUser] = useState({})
    const { userId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        getUserById(userId).then(userObj => setUser(userObj))
    }, [userId])

    const handleInputChange = (e) => {
        const copy = { ...user }
          copy[e.target.name] = e.target.value
          setUser(copy)
          }
  
  
      const handleEdit = () => {
  
          const editedUser = {
              id: user.id,
              userTypeId: user.userTypeId,
              email: user.email,
              lastName: user.lastName,
              firstName: user.firstName,
              displayName: user.displayName
          }
  
          updateUserType(editedUser)
          .then(() => {
              navigate(`/users`)
          })
      }
  

    return(
        <Container>
            <Form>
                <ListGroupItemHeading>
                    Edit User Type: {user.displayName}
                </ListGroupItemHeading>
                <Input
                type="number"
                name="userTypeId"
                value={user.userTypeId}
                onChange={handleInputChange}
                />
            </Form>
            <Button
            color="warning"
            size="sm"
            onClick={() => {navigate(`/users`)}}
            >
                Nevermind!
            </Button>
            <Button
            color="success"
            size="sm"
            onClick={handleEdit}
            >
                **Save**
            </Button>
        </Container>
    )
}