import { useEffect, useState } from "react"
import { getAllTags } from "../../Managers/TagManager.js";
import { Button, ListGroup, ListGroupItem, ListGroupItemHeading } from "reactstrap";
import { useNavigate } from "react-router-dom";

export const TagList = () => {
  const [tags, setTags] = useState([]);

  useEffect (() => { 
    getAllTags().then(allTags => setTags(allTags));
  }, [])

  let navigate = useNavigate();

  return (
    <>
    <ListGroup numbered>
      <ListGroupItemHeading>
        Tags
      </ListGroupItemHeading>
      {tags.map((tag) => (
        <ListGroupItem 
        key={tag.id}>
          {tag.name}
        </ListGroupItem>
      ))}
    </ListGroup>
    <Button
    onClick={() => {navigate(`/newTagAdded`)}}
>
    Create Tag
</Button>
</>
  );
}