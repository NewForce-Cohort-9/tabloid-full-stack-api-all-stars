import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Container, ListGroupItemHeading } from "reactstrap"
import { deleteTag, getTagById } from "../../Managers/TagManager.js"

export const DeleteTag = () => {

    const [tag, setTag] = useState({})

    const { tagId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        getTagById(tagId).then(tagTaco => setTag(tagTaco))
    }, [tagId])

    const handleDelete = () => {
        deleteTag(tagId)
        .then(() => {
            navigate("/Tags")
        })
    }

    return(
        <Container>

            <ListGroupItemHeading>
            Are you sure you want to delete this Tag: {tag.name}?
            </ListGroupItemHeading>
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
            onClick={handleDelete}
            >
                Confirm
            </Button>
        </Container>
    )
}