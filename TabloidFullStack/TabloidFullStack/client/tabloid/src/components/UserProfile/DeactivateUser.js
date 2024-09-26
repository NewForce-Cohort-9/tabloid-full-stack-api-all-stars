import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container } from "reactstrap"

export const DeactivateUser = () => {

    const [user, setUser] = useState({});
    
    const { userId } = useParams();

    const navigate = useNavigate();

    return(
        <Container>

        </Container>
    )
}