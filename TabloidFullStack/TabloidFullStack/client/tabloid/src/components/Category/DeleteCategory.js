import { Button, Container } from "reactstrap"

export const DeleteCategory = ({ category }) => {

    return(
        <Container>
            <h5>Are you sure you want to delete this Category?</h5>
            <Button
            
            >
                Delete!
            </Button>
        </Container>
    )
}