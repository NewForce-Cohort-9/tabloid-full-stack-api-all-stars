const baseUrl = 'https://localhost:5001/api';

export const getAllApprovedPosts = () => {
    return fetch(`${baseUrl}/Post`).then(res => res.json());
}

export const getAllApprovedUserPosts = (id) => {
    return fetch(`${baseUrl}/post/getallbyuserid/${id}`).then(res => res.json())
}

export const getPostById = (id) => {
    return fetch(`${baseUrl}/post/${id}`).then(res => res.json())
}

export const addPost = (post) => {
    return fetch(`${baseUrl}/post`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post)
    }).then(res => res.json()).then(data => {return data.id})
};

export const deletePost = (postId) => {
    return fetch(`${baseUrl}/post/${postId}`, {
        method: "DELETE"
    })
}

export const submitUpdatePost = (post) => {
    return fetch(`${baseUrl}/post/${post.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
}