import { useEffect } from "react";
import { useState } from "react"
import { getAllApprovedPosts, getAllApprovedPostsByTagId } from "../../Managers/PostManager.js";
import { Post } from "./Post.js";
import { getAllTags } from "../../Managers/TagManager.js";
import { Button } from "reactstrap";

export const PostList = () => {
    const [posts, setPosts] = useState();
    const [tags, setTags] = useState();
    const [tagSelection, setTagSelection] = useState({})

    const getAllPosts = () => {
        getAllApprovedPosts().then(postArr => setPosts(postArr));
    }

    useEffect(() => {
        getAllPosts()
    }, [])

    useEffect(() => {
        getAllTags().then(tagArr => setTags(tagArr))
    }, [])

    useEffect(() => {
        getAllApprovedPostsByTagId(tagSelection).then(postArr => setPosts(postArr))
    }, [tagSelection])

    if (!tags?.length > 0) {
        return <div>Loading</div>
    }

    return (
        <>
            <select name="tags" onChange={(e) => setTagSelection(e.target.value)}>
                <option selected>Filter By Tag</option>
                {tags.map(tag => {
                    return <option value={tag.id}>{tag.name}</option>
                })}
            </select>
            <Button onClick={() => getAllPosts()}>View All Posts</Button>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="cards-column">
                        {posts?.length > 0 ? posts.map((post) => (
                            <Post key={post.id} post={post} />
                        )) : ""}
                    </div>
                </div>
            </div>
        </>
    )
}