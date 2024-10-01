import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { getAllCategories } from "../../Managers/CategoryManager.js"
import { submitUpdatePost } from "../../Managers/PostManager.js"

export const EditPost = () => {
    const [postCategories, setPostCategories] = useState([])
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [imageLocation, setImageLocation] = useState("")
    const [post, setPost] = useState({})

    const { state } = useLocation()
    const navigate = useNavigate()

    const updatePost = async (e) => {
        e.preventDefault()
        await submitUpdatePost(post)
        navigate(`/post/${post.id}`)
    }

    useEffect(() => {
        setTitle(state.post.title)
        setContent(state.post.content)
        setImageLocation(state.post.imageLocation)
    }, [state])

    useEffect(() => {
        let postCopy = {}
        postCopy.id = state.post.id
        postCopy.title = title
        postCopy.content = content
        postCopy.imageLocation = imageLocation
        postCopy.categoryId = state.post.categoryId

        setPost(postCopy)
    }, [title, content, imageLocation])

    useEffect(() => {
        getAllCategories().then(categoryArr => setPostCategories(categoryArr))
    }, [])

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="cards-column">
                        <label for="addPostTitle">Edit Title</label>
                        <input id="addPostTitle" onChange={(e) => {
                                                                setTitle(e.target.value)
                        }} value={title}></input><br />
                        <label for="addPostContent">Content</label>
                        <input id="addPostContent" onChange={(e) => {
                                                                    setContent(e.target.value)
                        }}value={content}></input><br/>
                        <label for="addPostImageLocation">Image Url</label>
                        <input id="addPostImageLocation" 
                            type="text"
                                                    onChange={(e) => {
                                                                    setImageLocation(URL.createObjectURL(e.target.files[0]))
                        }} value={imageLocation}></input><br/>
                        <select name="categories" id="createPostCategories" onChange={(e) => {
                                    let copy = {...post}
                                    copy.categoryId = parseInt(e.target.value)
                                    setPost(copy)
                                }}>
                                <option>Select Post Category:</option>
                            {postCategories.map(category => {
                                if (state.post.categoryId === category.id) {
                                    return <option value={`${category.id}`} selected>{category.name}</option>
                                } else {
                                    return <option value={`${category.id}`} >{category.name}</option>
                                }
                            })}
                        </select><br />

                        <button id="submitNewPost" type="submit" onClick={(e) => updatePost(e)}>Edit Post!</button><br/>
                        <Link to={`/post/${post.id}`}>Back to post details!</Link>
                    </div>
                </div>
            </div>
        </>
    )
}