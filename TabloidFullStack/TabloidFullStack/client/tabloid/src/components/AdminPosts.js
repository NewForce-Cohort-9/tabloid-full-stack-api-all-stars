import { useEffect, useState } from "react";
import { getAllApprovedPosts } from "./AdminManager.js";
import { AdminPostList } from "./AdminPostList.js"; // Import the new AdminPostList component

export const AdminPosts = () => {
    const [posts, setPosts] = useState([]);

    // Fetch posts when component mounts
    useEffect(() => {
        getAllApprovedPosts().then(postArr => setPosts(postArr));
    }, []);

    return (
        <div className="container">
            <h1>Admin Posts</h1>
            <AdminPostList posts={posts} setPosts={setPosts} /> {/* Use AdminPostList */}
        </div>
    );
};
