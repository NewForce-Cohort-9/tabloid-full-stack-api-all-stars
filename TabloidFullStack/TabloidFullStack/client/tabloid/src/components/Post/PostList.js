import { useEffect } from "react";
import { useState } from "react"
import { getAllApprovedPosts } from "../../Managers/PostManager.js";
import { Post } from "./Post.js";

export const PostList = () => {
    const [posts, setPosts] = useState();

    useEffect(() => {
        getAllApprovedPosts().then(postArr => setPosts(postArr));
    }, [])

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="cards-column">
                        {posts ? posts.map((post) => (
                            <Post key={post.id} post={post} />
                        )) : ""}
                    </div>
                </div>
            </div>
        </>
    )
}