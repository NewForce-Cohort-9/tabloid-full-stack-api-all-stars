const baseUrl = "https://localhost:5001/api/PostReaction";

export const getReactionsByPostId = (postId) => {
  return fetch(`${baseUrl}/GetReactionsByPostId/${postId}`).then((res) =>
    res.json()
  );
};

export const addPostReaction = (postReaction) => {
  return fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postReaction),
  })
    .then((res) => res.json())
    .then((data) => {
      return data.id;
    });
};
