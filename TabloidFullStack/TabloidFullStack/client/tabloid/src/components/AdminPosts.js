import { useEffect, useState } from "react";
import { getAllApprovedPosts, approvePost, rejectPost } from "./AdminManager.js";
import { Post } from "./Post.js"; // Reuse the Post component

export const AdminPosts = () => {
    const [posts, setPosts] = useState([]);

    // Fetch posts when component mounts
    useEffect(() => {
        getAllApprovedPosts().then(postArr => setPosts(postArr));
    }, []);

    // Function to handle approving a post
    const handleApprove = async (postId) => {
        try {
            await approvePost(postId);
            // Remove the approved post from the list
            setPosts(posts.filter(post => post.id !== postId));
            alert('Post approved successfully!');
        } catch (error) {
            console.error("Error approving post: ", error);
        }
    };

    // Function to handle rejecting a post
    const handleReject = async (postId) => {
        try {
            await rejectPost(postId);
            // Remove the rejected post from the list
            setPosts(posts.filter(post => post.id !== postId));
            alert('Post rejected successfully!');
        } catch (error) {
            console.error("Error rejecting post: ", error);
        }
    };

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="cards-column">
                        {posts.length ? (
                            posts.map((post) => (
                                <div key={post.id} className="post-item">
                                    <Post post={post} />

                                    {/* Add Approve and Reject buttons */}
                                    <button 
                                        className="btn btn-success" 
                                        onClick={() => handleApprove(post.id)}
                                    >
                                        Approve
                                    </button>
                                    <button 
                                        className="btn btn-danger" 
                                        onClick={() => handleReject(post.id)}
                                    >
                                        Reject
                                    </button>
                                    <hr />
                                </div>
                            ))
                        ) : (
                            <p>No posts available</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
