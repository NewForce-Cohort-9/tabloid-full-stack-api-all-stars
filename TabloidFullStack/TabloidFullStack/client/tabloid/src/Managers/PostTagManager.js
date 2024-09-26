const baseUrl = "https://localhost:5001/api/PostTag"

export const getPostTagsByPostId = (postId) => {
    return fetch(`${baseUrl}/getbypostid/${postId}`).then(res => res.json())
}

export const submitPostTag = (postTag) => {
    return fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postTag)
    })
}

export const removePostTagsByPostTagId = (postTagId) => {
    return fetch(`${baseUrl}/${postTagId}`, {
        method: "DELETE"
    })
}