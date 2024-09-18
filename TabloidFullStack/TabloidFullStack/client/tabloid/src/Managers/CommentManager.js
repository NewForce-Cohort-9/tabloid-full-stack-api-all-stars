const baseUrl = "https://localhost:5001/api/Comment";

export const getCommentsByPostId = () => {
  return fetch(`${baseUrl}?id=1`).then((res) => res.json());
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
