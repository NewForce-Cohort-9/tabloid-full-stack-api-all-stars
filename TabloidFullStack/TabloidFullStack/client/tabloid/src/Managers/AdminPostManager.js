const apiUrl = "https://localhost:5001/api";


export const getApprovedPosts = () => {
    return fetch(`${apiUrl}/post`)
        .then(response => response.json());
};


export const approvedPosts = (post) => {
    return fetch(`${apiUrl}/post/${post.id}`, {
        method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
    });
};


export const rejectedPosts = (post) => {
    return fetch(`${apiUrl}/post/${post.id}`, {
        method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
    });
};
