const baseUrl = "https://localhost:5001/api/Comment";

export const getCommentsByPostId = (id) => {
  return fetch(`${baseUrl}?id=${id}`)
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching comments:", error);
    });
};

export const addComment = (singleComment) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(singleComment),
  });
};

export const deleteComment = (commentId) => {
  return fetch(`${baseUrl}/${commentId}`, {
    method: "DELETE",
  });
};

export const updateComment = (comment) => {
  return fetch(`${baseUrl}/${comment.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
};
