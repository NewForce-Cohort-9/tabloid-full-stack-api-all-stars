const baseUrl = "https://localhost:5001/api/PostReaction";

export const getReactionsByPostId = (postId) => {
  return fetch(`${baseUrl}/GetReactionsByPostId/${postId}`).then((res) =>
    res.json()
  );
};
