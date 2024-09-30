import { useEffect, useState } from "react";
import { getApprovedPosts, approvedPosts } from "../Managers/AdminPostManager.js";
import { Post } from "./Post/Post.js";

export const AdminPostList = ({ isAdmin }) => { 
    const [allPosts, setAllPosts] = useState([]);

    const getAllPosts = () => {
        getApprovedPosts().then(postList => {
            const approvedPostIds = JSON.parse(localStorage.getItem('approvedPosts')) || [];
            const filteredPosts = postList.filter(post => !approvedPostIds.includes(post.id));
            setAllPosts(filteredPosts);
        })
    };

    useEffect(() => {
        getAllPosts(); 
    }, []);


    const handleApproval = (post) => {
        const approvedPost = {
            id: post.id, 
            title: post.title,  
            content: post.content,
            imageLocation: post.imageLocation,
            createDateTime: post.createDateTime,
            publishDateTime: post.publishDateTime,
            categoryId: post.categoryId,
            userProfileId: post.userProfileId, 
            isApproved: true 
        }
    
        approvedPosts(approvedPost) 
        .then(() => {
            const approvedPostIds = JSON.parse(localStorage.getItem('approvedPosts')) || [];

            const updatedPostIds = new Set(approvedPostIds);
        updatedPostIds.add(post.id); 

        localStorage.setItem('approvedPosts', JSON.stringify(Array.from(updatedPostIds)));

            // Removing approved post from state and then the list in order for post to disappear from Admin Post Management upon refresh
            setAllPosts(allPosts.filter(p => p.id !== post.id)); 
        })
    };
    
    return (
        <div className="container">
            <h2>Admin Post Management</h2>
            <div className="row justify-content-center">
                <div className="cards-column">
                    {allPosts.length > 0 ? (
                        allPosts.map((post) => ( 
                            <div key={post.id} className="post-item">
                                <Post post={post} />  
                                {isAdmin && (
                                    <div>
                                        <button 
                                            className="btn btn-success" 
                                            onClick={() => handleApproval(post)}
                                        >
                                            Approve
                                        </button>
                                    </div>
                                )}
                                <hr />
                            </div>
                        ))
                    ) : (
                        <p>No posts available</p>
                    )}
                </div>
            </div>
        </div>
    );
};
