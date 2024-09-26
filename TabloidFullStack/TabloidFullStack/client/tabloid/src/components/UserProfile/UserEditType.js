import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getUserById } from "../../Managers/UserProfileManager.js";
import { Container } from "reactstrap";

export const UserEditType = () => {
    
    const [user, setUser] = useState({})
    const { userId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        getUserById(userId).then(userObj => setUser(userObj))
    }, [userId])

    return(
        <Container>
            
        </Container>
    )
}