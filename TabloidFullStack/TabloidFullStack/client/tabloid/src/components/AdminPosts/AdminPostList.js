import { getApprovedPosts, rejectPost } from "../../Managers/AdminPostManager.js";
import { Post } from "../Post/Post.js";

export const AdminPostList = ({ posts, setPosts }) => {
  
    const handleApprove = async (postId) => {
        await getApprovedPosts(postId);
        setPosts(posts.filter(post => post.id !== postId));
        alert('Post approved successfully!');
    };

    const handleReject = async (postId) => {
        await rejectPost(postId);
        setPosts(posts.filter(post => post.id !== postId));
        alert('Post rejected successfully!');
    };

    return (
        <div className="row justify-content-center">
            <div className="cards-column">
                {posts.length ? (
                    posts.map((post) => (
                        <div key={post.id} className="post-item">
                            <Post post={post} />
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
    );
};
