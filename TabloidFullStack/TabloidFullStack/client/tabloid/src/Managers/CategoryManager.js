const apiUrl = "https://localhost:5001/api/Category";

export const getAllCategories = () => {
    return fetch(apiUrl)
    .then((res) => res.json())
};
