import { useEffect, useState } from "react"
import { getAllCategories } from "../../Managers/CategoryManager.js"
import { addPost } from "../../Managers/PostManager.js"
import { useNavigate } from "react-router-dom"

export const CreatePost = () => {
    const [postCategories, setPostCategories] = useState([])
    const [post, setPost] = useState({})

    const navigate = useNavigate()
    
    const createPostObj = () => {
        let user = localStorage.getItem("userProfile")
        const parsedUser = JSON.parse(user)
        
        let postCopy = {...post}
        postCopy.UserProfileId = parsedUser.id
        postCopy.IsApproved = true
        postCopy.PublishDateTime = new Date()
        postCopy.CreateDateTime = new Date()

        addPost(postCopy).then(postId => navigate(`/post/${postId}`))
    }

    useEffect(() => {
        getAllCategories().then(categoryArr => setPostCategories(categoryArr))
    }, [])

    if (!postCategories.length > 0) {
        return <div>No Data Yet!</div>
    }

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
                        <select name="categories" id="createPostCategories" onChange={(e) => {
                                    let copy = {...post}
                                    copy.categoryId = e.target.value
                                    setPost(copy)
                                }}>
                                <option selected>Select Post Category:</option>
                            {postCategories.map(category => {
                                return <option value={`${category.id}`} >{category.name}</option>
                            })}
                        </select><br />

                        <button id="submitNewPost" type="submit" onClick={() => createPostObj()}>Add Post!</button>
                    </div>
                </div>
            </div>
        </>
    )
}