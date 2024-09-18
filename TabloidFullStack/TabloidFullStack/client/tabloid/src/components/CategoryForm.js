import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap"

export const CategoryForm = () => {
    return(
        <>
        <Container>
            <Form>
                <h4>
                    Create New Category
                </h4>
                <FormGroup>
                    <Label for="name">Category Name</Label>
                    <Input />
                </FormGroup>
                <Button>
                    Save
                </Button>
            </Form>
        </Container>
        </>
    )
}