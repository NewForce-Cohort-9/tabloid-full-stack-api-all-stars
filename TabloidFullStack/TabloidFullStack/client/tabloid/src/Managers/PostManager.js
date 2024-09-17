const baseUrl = 'https://localhost:5001/api';

export const getAllApprovedPosts = () => {
    return fetch(`${baseUrl}/Post`).then(res => res.json());
}