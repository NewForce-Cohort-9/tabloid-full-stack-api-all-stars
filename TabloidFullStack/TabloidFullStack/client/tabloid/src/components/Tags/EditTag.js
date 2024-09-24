import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Container, Form, Input, ListGroupItemHeading } from "reactstrap"

export const updateTag = () => {

    const [newTag, setNewTag] = useState({})

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
        <>
       {/* Button trigger modal */}
       <form>
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
Edit Tag: '{tag.name}'?
</button>
<Input 
                    type="text"
                    name="name"
                    value={tag.name}
                    onChange={handleInputChange}
                />
</form>

{/* Modal  */}
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"  color="warning" size="sm" onClick={() => {navigate(`/Tags`)}} >Deny</button>
        <button type="button" class="btn btn-primary" color="success" size="sm" onClick={handleEdit}>Confirm</button>
      </div>
    </div>
  </div>
</div>
</>
    )
}