const apiUrl = "http://localhost:5001/api";

// Fetch all approved posts
export const getApprovedPosts = () => {
    return fetch(`${apiUrl}/posts`)
        .then(response => response.json());
};

// Approve a post by ID
export const approvePost = (id) => {
    return fetch(`${apiUrl}/posts/${id}/approve`, {
        method: "PATCH"
    });
};

// Reject a post by ID
export const rejectPost = (id) => {
    return fetch(`${apiUrl}/posts/${id}/reject`, {
        method: "PATCH"
    });
};
