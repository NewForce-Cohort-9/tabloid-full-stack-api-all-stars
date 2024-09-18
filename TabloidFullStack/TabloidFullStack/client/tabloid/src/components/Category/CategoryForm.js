import { useState } from "react"
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { addCategory } from "../../Managers/CategoryManager.js";
import { useNavigate } from "react-router-dom";

export const CategoryForm = () => {

    const [categoryName, setCategoryName] = useState("");

    const navigate = useNavigate();

    const save = (e) => {
        const newCategory = {
            name: categoryName,
        }
        addCategory(newCategory).then((c) => {
            navigate("/category");
        });
    };

    return(
        <>
        <Container>
            <Form>
                <h4>
                    Create New Category
                </h4>
                <FormGroup>
                    <Label for="name">Category Name</Label>
                    <Input 
                        onChange={(e) => setCategoryName(e.target.value)}
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