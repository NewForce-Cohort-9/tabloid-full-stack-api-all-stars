import { useEffect, useState } from "react"
import { getAllTags } from "../Managers/TagManager.js";
import { ListGroup, ListGroupItem, ListGroupItemHeading } from "reactstrap";

export const TagList = () => {
  const [tags, setTags] = useState([]);

  useEffect (() => { 
    getAllTags().then(allTags => setTags(allTags));
  }, [])

  return (
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
  )
}