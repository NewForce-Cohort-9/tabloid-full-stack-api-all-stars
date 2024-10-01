import { useEffect, useState } from "react"
import { getAllUsers } from "../../Managers/UserProfileManager.js";
import { Button, Container, List, ListGroup, ListGroupItem } from "reactstrap";
import { useNavigate } from "react-router-dom";

export const UserList = () => {

    const [users, setUsers] = useState([]);
    const [activeUsers, setActiveUsers] = useState([]);
    const [adminUserCounter, setAdminUserCounter] = useState(0);

    const getUsers = () => {
        getAllUsers().then(usersObj => setUsers(usersObj))
    };

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        const active = users.filter((user) => user.deactivated === false)
        setActiveUsers(active)
    }, [users])

    useEffect(() => {
        let counter = 0
        activeUsers.forEach(user => {
            if (user.userTypeId === 1) {
                counter++
            } 
        })
        setAdminUserCounter(counter)
    }, [activeUsers])

    const navigate = useNavigate();

    return(
        <Container>
            <List>
                <ListGroup>
                    All Active Users
                </ListGroup>
                {activeUsers.map((user) => (
                    <ListGroupItem
                    key={user.id}
                    >
                        Display Name: {user.displayName} 
                        Full Name: {user.fullName}
                        User Type: {user.userType.name}
                    <Button
                    color="success"
                    onClick={() => {navigate(`/users/editType/${user.id}`, { state: {adminCount: adminUserCounter}})}}
                    >
                        Edit
                    </Button>
                    <Button
                    onClick={() => {navigate(`/users/${user.id}`)}}
                    >
                        View Details
                    </Button>
                    <Button
                    color="danger"
                    onClick={() => {navigate(`/users/deactivate/${user.id}`, { state: {adminCount: adminUserCounter}})}}
                    >
                        Deactivate User
                    </Button>
                    </ListGroupItem>
                ))}
                <ListGroup>
                    <ListGroupItem>
                        <Button
                        color="warning"
                        onClick={() => {navigate(`/users/deactivated`)}}
                        >
                            Deactivated Users
                        </Button>
                    </ListGroupItem>
                </ListGroup>
            </List>
        </Container>
    )
}