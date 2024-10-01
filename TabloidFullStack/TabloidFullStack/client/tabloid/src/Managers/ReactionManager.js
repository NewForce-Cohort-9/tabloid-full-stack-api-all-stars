const baseUrl = "https://localhost:5001/api/Reaction";

export const getAllReactions = () => {
  return fetch(`${baseUrl}`).then((res) => res.json());
};
