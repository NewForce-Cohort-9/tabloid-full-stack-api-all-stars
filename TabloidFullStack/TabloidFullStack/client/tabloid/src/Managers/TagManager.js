const apiUrl = "https://localhost:5001/api/Tag";

export const getAllTags = () => {
    return fetch(apiUrl)
    .then((res) => res.json())
};
