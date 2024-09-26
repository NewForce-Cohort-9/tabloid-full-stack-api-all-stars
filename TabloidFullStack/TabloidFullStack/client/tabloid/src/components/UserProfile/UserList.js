import { useEffect, useState } from "react"
import { getAllUsers } from "../../Managers/UserProfileManager.js";
import { Button, Container, List, ListGroup, ListGroupItem } from "reactstrap";
import { useNavigate } from "react-router-dom";

export const UserList = () => {

    const [users, setUsers] = useState([]);

    const getUsers = () => {
        getAllUsers().then(usersObj => setUsers(usersObj))
    };

    useEffect(() => {
        getUsers();
    }, []);

    const navigate = useNavigate();

    return(
        <Container>
            <List>
                <ListGroup>
                    All Users
                </ListGroup>
                {users.map((user) => (
                    <ListGroupItem
                    key={user.id}
                    >
                        Display Name: {user.displayName} 
                        Full Name: {user.fullName}
                        User Type: {user.userType.name}
                    <Button
                    color="success"
                    onClick={() => {navigate(`/users/editType/${user.id}`)}}
                    >
                        Edit
                    </Button>
                    <Button
                    onClick={() => {navigate(`/users/${user.id}`)}}
                    >
                        View Details
                    </Button>
                    </ListGroupItem>
                ))}
            </List>
        </Container>
    )
}