import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getTagById, updateTag } from "../../Managers/TagManager.js"
import { Button, Container, Form, Input, ListGroupItemHeading } from "reactstrap"

export const EditTag = () => {

    const [tag, setNewTag] = useState({})

    const { tagId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        getTagById(tagId).then(tagTaco => setNewTag(tagTaco))
    }, [tagId])

    const handleInputChange = (e) => {
      const copy = { ...tag }
        copy[e.target.name] = e.target.value
        setTag(copy)
        }


    const handleEdit = () => {

        const editedTag = {
            id: tag.id,
            name: tag.name,
        }

        updateTag(editedTag)
        .then(() => {
            navigate("/Tags")
        })
    }

    return(
<Container>
            <Form>
                <ListGroupItemHeading>
                    Edit Tag: '{tag.name}'
                </ListGroupItemHeading>
                <Input 
                    type="text"
                    name="name"
                    value={tag.name}
                    onChange={handleInputChange}
                />
            </Form>
            <Button
            color="warning"
            size="sm"
            onClick={() => {navigate(`/Tags`)}}
            >
                Deny
            </Button>
            <Button
            color="success"
            size="sm"
            onClick={handleEdit}
            >
                Confirm
            </Button>
        </Container>
    )
}