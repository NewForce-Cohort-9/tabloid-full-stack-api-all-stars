import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Container, ListGroupItemHeading } from "reactstrap"
import { deleteCategory, getCategoryById } from "../../Managers/CategoryManager.js"

export const EditCategory = () => {

    const [category, setCategory] = useState({})

    const { categoryId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        getCategoryById(categoryId).then(categoryObj => setCategory(categoryObj))
    }, [categoryId])

    const handleDelete = () => {
        deleteCategory(categoryId)
        .then(() => {
            navigate("/category")
        })
    }

    return(
        <Container>

            <ListGroupItemHeading>
            Are you sure you want to delete this Category: {category.name}?
            </ListGroupItemHeading>
            <Button
            color="warning"
            size="sm"
            onClick={() => {navigate(`/category`)}}
            >
                Nevermind!
            </Button>
            <Button
            color="danger"
            size="sm"
            onClick={handleDelete}
            >
                Delete!!!!!!!!
            </Button>
        </Container>
    )
}