import { useEffect, useState } from "react"
import { getAllTags } from "../../Managers/TagManager.js";
import { Button, Container, ListGroup, ListGroupItem, ListGroupItemHeading } from "reactstrap";
import { useNavigate } from "react-router-dom";

export const TagList = () => {
  const [tags, setTags] = useState([]);

  useEffect (() => { 
    getAllTags().then(allTags => setTags(allTags));
  }, [])

  let navigate = useNavigate();

  return (
    <Container>
    <ListGroup numbered>
      <ListGroupItemHeading>
        Tags
      </ListGroupItemHeading>
      {tags.map((tag) => (
        <ListGroup>
        <ListGroupItem 
        key={tag.id}>
          {tag.name}
        </ListGroupItem>
        <Button
        color="dark"
        size="sm"
        onClick={() => {navigate(`/editTags/${tag.id}`)}}
    >
        Edit
        </Button>
    </ListGroup>
          ))}
    </ListGroup>
    <Button
    onClick={() => {navigate(`/newTagAdded`)}}
    color="primary"
>
    Create Tag
</Button>
</Container>
  );
}