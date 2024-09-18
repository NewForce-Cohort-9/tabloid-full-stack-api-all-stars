import { useEffect, useState } from "react";
import { getAllCategories } from "../Managers/CategoryManager.js";
import { Button, ListGroup, ListGroupItem, ListGroupItemHeading } from "reactstrap";
import { Navigate, useNavigate } from "react-router-dom";

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
            <ListGroup>
            <ListGroupItemHeading>
                Categories (A -&gt; Z)
            </ListGroupItemHeading>
                {categories.map((category) => (
                    <ListGroupItem
                    key={category.id}
                    >{category.name}</ListGroupItem>
                ))}
            </ListGroup>
            <Button
                onClick={() => {navigate(`/newCategory`)}}
            >
                Create Category
            </Button>
        </>
    );
};