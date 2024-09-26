import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getUserById, updateUserType } from "../../Managers/UserProfileManager.js";
import { Button, Container, Form, FormGroup, Input, Label, ListGroupItemHeading } from "reactstrap";

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
                {/* <Input
                type="number"
                name="userTypeId"
                value={user.userTypeId}
                onChange={handleInputChange}
                /> */}

            <FormGroup>
                <Label for="userType">
                    User Type
                </Label>
                    {(user.userTypeId === 1 || user.userTypeId === "1" ) && (
                    <Input
                        name="userTypeId"
                        type="select"
                        onChange={handleInputChange}
                    >
                        <option
                    value="1"
                    selected
                    >
                     Admin    
                    </option> 
                    <option
                    value="2"
                    >
                        Author
                    </option>
                    </Input>
                    )}

                {(user.userTypeId === 2 || user.userTypeId === "2") && (
                    <Input
                        name="userTypeId"
                        type="select"
                        onChange={handleInputChange}

                    >
                        <option
                    value="1"
                    >
                     Admin    
                    </option> 
                    <option
                    value="2"
                    selected
                    >
                        Author
                    </option>
                    </Input>
                    )}
                    
            </FormGroup>
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
            </Form>
        </Container>
    )
}