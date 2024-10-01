const baseUrl = "https://localhost:5001/api/Reaction";

export const getAllReactions = () => {
  return fetch(`${baseUrl}`).then((res) => res.json());
};

export const addReaction = (reaction) => {
  return fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reaction),
  })
    .then((res) => res.json())
    .then((data) => {
      return data.id;
    });
};
