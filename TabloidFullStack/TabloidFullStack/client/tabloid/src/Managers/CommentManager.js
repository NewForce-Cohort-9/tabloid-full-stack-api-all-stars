const baseUrl = "https://localhost:5001/api/Comment";

export const getCommentsByPostId = () => {
  return fetch(`${baseUrl}?id=1`).then((res) => res.json());
};
