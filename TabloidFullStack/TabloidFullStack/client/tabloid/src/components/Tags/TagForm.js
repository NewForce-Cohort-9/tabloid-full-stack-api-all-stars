import { useState } from "react"
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { useNavigate } from "react-router-dom";
import { addTag } from "../../Managers/TagManager.js";

export const TagForm = () => {

    const [newTag, setNewTag] = useState("");

    const navigate = useNavigate();

    const save = (e) => {
        const newTagAdded = {
            name: newTag,
        }
        addTag(newTagAdded).then((c) => {
            navigate("/Tags");
        });
    };

    return(
        <>
        <Container>
            <Form>
                <h4>
                    Create New Tag
                </h4>
                <FormGroup>
                    <Label for="name">Tag Name</Label>
                    <Input 
                        onChange={(e) => setNewTag(e.target.value)}
                    />
                </FormGroup>
                <Button
                    onClick={save}
                >
                    Save
                </Button>
            </Form>
        </Container>
        </>
    )
}