import { useEffect, useState } from "react";
import { getAllCategories } from "../../Managers/CategoryManager.js";
import { Button, Container, List, ListGroup, ListGroupItem, ListGroupItemHeading } from "reactstrap";
import { useNavigate } from "react-router-dom";

export const CategoryList = () => {
    
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        getAllCategories().then(allCategories => setCategories(allCategories));
    }

    useEffect(() => {
        getCategories();
    }, []);

    let navigate = useNavigate();

    return(
        <>
            <Container>
                <List>
                    <ListGroupItemHeading>
                        Categories (A -&gt; Z)
                    </ListGroupItemHeading>
                        {categories.map((category) => (
                            <ListGroup
                            horizontal
                            >
                                <ListGroupItem
                                key={category.id}
                                >{category.name}
                                </ListGroupItem>
                                <Button
                                    color="danger"
                                    size="sm"
                                    onClick={() => {navigate(`/deleteCategory/${category.id}`)}}
                                >
                                    Delete
                                </Button>
                        </ListGroup>
                        ))}
                    </List>
                    <Button
                        onClick={() => {navigate(`/newCategory`)}}
                    >
                        Create Category
                    </Button>
            </Container>
        </>
    );
};