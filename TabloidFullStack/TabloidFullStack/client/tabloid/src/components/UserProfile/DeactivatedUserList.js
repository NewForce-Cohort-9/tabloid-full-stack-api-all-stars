import { useEffect, useState } from "react"
import { getAllUsers } from "../../Managers/UserProfileManager.js";
import { Button, Container, List, ListGroup, ListGroupItem } from "reactstrap";
import { useNavigate } from "react-router-dom";

export const DeactivatedUserList = () => {

    const [users, setUsers] = useState([]);
    const [deactivatedUsers, setDeactivatedUsers] = useState([]);

    const getUsers = () => {
        getAllUsers().then(usersObj => setUsers(usersObj))
    };

    useEffect(() => {
        getUsers();
        }, []);

    useEffect(() => {
        const deactivated = users.filter((user) => user.deactivated === true)
        setDeactivatedUsers(deactivated)
    }, [users]);

    const navigate = useNavigate();

    return(
        <Container>
            <List>
                <ListGroup>
                    Deactivated Users
                </ListGroup>
                {deactivatedUsers.map((user) => (
                    <ListGroupItem
                    key={user.id}
                    >
                        Display Name: {user.displayName} 
                        Full Name: {user.fullName}
                        User Type: {user.userType.name}
                    <Button
                    onClick={() => {navigate(`/users/reactivate/${user.id}`)}}
                    >
                        Reactivate User
                    </Button>
                    </ListGroupItem>
                ))}
            <ListGroup>
                <Button
                    onClick={() => {navigate(`/users`)}}
                >
                    Return to User List
                </Button>
            </ListGroup>
            </List>
        </Container>
    )
}