const API = "http://localhost:5001/api";

// Fetch all approved posts
export const getAllApprovedPosts = () => {
    return fetch(`${api}/posts`)
        .then(response => response.json());
};

// Approve a post by ID
export const approvePost = (postId) => {
    return fetch(`${api}/posts/${postId}/approve`, {
        method: "PATCH"
    });
};

// Reject a post by ID
export const rejectPost = (postId) => {
    return fetch(`${api}/posts/${postId}/reject`, {
        method: "PATCH"
    });
};
