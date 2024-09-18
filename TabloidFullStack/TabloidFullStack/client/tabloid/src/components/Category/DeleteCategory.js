import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Container, ListGroupItem } from "reactstrap"

export const DeleteCategory = () => {

    const [category, setCategory] = useState({})
    
    const { categoryId } = useParams();

    const navigate = useNavigate();

    return(
        <Container>
            <h5>Are you sure you want to delete this Category?</h5>
            <ListGroupItem>
                {category.name}
            </ListGroupItem>
            <Button
            >
                Delete!
            </Button>
        </Container>
    )
}