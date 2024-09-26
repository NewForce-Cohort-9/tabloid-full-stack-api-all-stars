import { useEffect, useState } from "react";
import { AdminPostList } from "../AdminPostList.js"; 
import { getApprovedPosts } from "../../Managers/AdminPostManager.js";

export const AdminPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getApprovedPosts().then(postArr => setPosts(postArr));
    }, []);

    return (
        <div className="container">
            <h1>Admin Posts</h1>
            <AdminPostList posts={posts} setPosts={setPosts} />
        </div>
    );
};
