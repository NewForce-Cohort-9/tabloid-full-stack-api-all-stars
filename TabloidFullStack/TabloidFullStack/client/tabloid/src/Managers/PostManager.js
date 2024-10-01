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

export const getAllApprovedPostsByTagId = (tagId) => {
    return fetch(`${baseUrl}/post/getallapprovedpostsbytagid/${tagId}`).then(res => res.json())
}

export const getAllApprovedPostsByCategoryId = (categoryId) => {
    return fetch(`${baseUrl}/post/getallapprovedpostsbycategoryid/${categoryId}`).then(res => res.json())
}

export const getAllApprovedPostsByUserId = (userId) => {
    return fetch(`${baseUrl}/post/getallapprovedpostsbyuserid/${userId}`).then(res => res.json())
}