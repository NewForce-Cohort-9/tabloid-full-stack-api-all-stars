const apiUrl = "https://localhost:5001/api";


export const getApprovedPosts = () => {
    return fetch(`${apiUrl}/post`)
        .then(response => response.json()).then(posts => posts.filter(post => post.isApproved))
};


export const approvedPosts = (postId) => {
    return fetch(`${apiUrl}/post/${postId}`, {
        method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({id: postId })
    });
};

export const getUnApprovedPosts = () => {
    return fetch(`${apiUrl}/post`)
        .then(response => response.json()).then(posts => posts.filter(post => !post.isApproved))
};

// export const rejectedPosts = (post) => {
//     return fetch(`${apiUrl}/post/${post.id}`, {
//         method: "PUT",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(post)
//     });
// };
