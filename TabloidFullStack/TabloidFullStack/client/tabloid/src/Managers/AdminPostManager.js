const apiUrl = "http://localhost:5001/api";

// Fetch all approved posts
export const getApprovedPosts = () => {
    return fetch(`${apiUrl}/posts`)
        .then(response => response.json());
};

// Approve a post by ID
export const approvePost = (postId) => {
    return fetch(`${apiUrl}/posts/${postId}/approve`, {
        method: "PATCH"
    });
};

// Reject a post by ID
export const rejectPost = (postId) => {
    return fetch(`${apiUrl}/posts/${postId}/reject`, {
        method: "PATCH"
    });
};
