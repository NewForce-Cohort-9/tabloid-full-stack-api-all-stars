import { useEffect, useState } from "react"
import { getAllCategories } from "../../Managers/CategoryManager.js"
import { addPost } from "../../Managers/PostManager.js"

export const CreatePost = () => {
    const [postCategories, setPostCategories] = useState([])
    const [post, setPost] = useState({})
    
    const createPostObj = () => {
        let user = localStorage.getItem("userProfile")
        const parsedUser = JSON.parse(user)
        
        let postCopy = {...post}
        postCopy.UserProfileId = parsedUser.id
        postCopy.IsApproved = 1

        addPost(postCopy)
    }

    useEffect(() => {
        getAllCategories().then(categoryArr => setPostCategories(categoryArr))
    }, [])

    // if (!postCategories.length > 0) {
    //     return <div>No Data Yet!</div>
    // }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="cards-column">
                        <label for="addPostTitle">Title</label>
                        <input id="addPostTitle" onChange={(e) => {
                                                                let postObj = {...post}
                                                                postObj.Title = e.target.value
                                                                setPost(postObj)
                        }}></input><br />
                        <label for="addPostContent">Content</label>
                        <input id="addPostContent" onChange={(e) => {
                                                                    let postObj = {...post}
                                                                    postObj.Content = e.target.value
                                                                    setPost(postObj)
                        }}></input><br/>
                        <label for="addPostImageLocation">Image Url</label>
                        <input id="addPostImageLocation" onChange={(e) => {
                                                                    let postObj = {...post}
                                                                    postObj.ImageLocation = e.target.value
                                                                    setPost(postObj)
                        }}></input><br/>
                        <label for="categories">Select Post Category:</label>
                        <select name="categories" id="createPostCategories">
                            {postCategories.forEach(category => {
                                <option value={`${category.id}`} onClick={(e) => {
                                    let copy = {...post}
                                    copy.categoryId = e.target.value
                                    setPost = copy
                                }}>{category.name}</option>
                            })}
                        </select><br />

                        <button id="submitNewPost" type="submit" onClick={() => createPostObj()}>Add Post!</button>
                    </div>
                </div>
            </div>
        </>
    )
}