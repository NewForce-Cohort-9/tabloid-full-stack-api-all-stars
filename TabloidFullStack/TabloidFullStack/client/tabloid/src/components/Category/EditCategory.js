import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Container, Form, Input, ListGroupItemHeading } from "reactstrap"
import { getCategoryById, updateCategory } from "../../Managers/CategoryManager.js"

export const EditCategory = () => {

    const [category, setCategory] = useState({})

    const { categoryId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        getCategoryById(categoryId).then(categoryObj => setCategory(categoryObj))
    }, [categoryId])

    const handleInputChange = (e) => {
      const copy = { ...category }
        copy[e.target.name] = e.target.value
        setCategory(copy)
        }


    const handleEdit = () => {

        const editedCategory = {
            id: category.id,
            name: category.name,
        }

        updateCategory(editedCategory)
        .then(() => {
            navigate("/category")
        })
    }

    return(
        <Container>
            <Form>
                <ListGroupItemHeading>
                    Edit category: '{category.name}'?
                </ListGroupItemHeading>
                <Input 
                    type="text"
                    name="name"
                    value={category.name}
                    onChange={handleInputChange}
                />
            </Form>
            <Button
            color="warning"
            size="sm"
            onClick={() => {navigate(`/category`)}}
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
        </Container>
    )
}