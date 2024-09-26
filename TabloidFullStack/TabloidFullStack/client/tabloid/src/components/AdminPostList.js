import { Post } from "./Post.js"; // Reuse the Post component
import { approvePost, rejectPost } from "./AdminManager.js"; // Import the API functions

export const PostList = ({ posts, setPosts }) => {

    // Function to handle approving a post
    const handleApprove = async (postId) => {
        await approvePost(postId);
        // Remove the approved post from the list
        setPosts(posts.filter(post => post.id !== postId));
        alert('Post approved successfully!');
    };

    // Function to handle rejecting a post
    const handleReject = async (postId) => {
        await rejectPost(postId);
        // Remove the rejected post from the list
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
    );
};
