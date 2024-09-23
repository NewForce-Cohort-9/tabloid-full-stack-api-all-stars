import { useEffect, useState } from "react"
import { getAllUsers } from "../../Managers/UserProfileManager.js";
import { Container, List, ListGroup, ListGroupItem } from "reactstrap";

export const UserList = () => {

    const [users, setUsers] = useState([]);

    const getUsers = () => {
        getAllUsers().then(usersObj => setUsers(usersObj))
    };

    useEffect(() => {
        getUsers();
    }, []);

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
                        {user.displayName} {user.fullName} {user.userType.name}
                    </ListGroupItem>
                ))}
            </List>
        </Container>
    )
}