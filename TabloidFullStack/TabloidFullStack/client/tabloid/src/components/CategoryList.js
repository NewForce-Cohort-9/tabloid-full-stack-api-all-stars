import { useEffect, useState } from "react";
import { getAllCategories } from "../Managers/CategoryManager.js";
import { ListGroup, ListGroupItem, ListGroupItemHeading } from "reactstrap";

export const CategoryList = () => {
    
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        getAllCategories().then(allCategories => setCategories(allCategories));
    }

    useEffect(() => {
        getCategories();
    }, []);

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
        </>
    );
};