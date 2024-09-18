import { useEffect, useState } from "react"
import { getPostById } from "../../Managers/PostManager.js"
import { useParams } from "react-router-dom"
import { Card } from "reactstrap"

export const PostDetails = () => {
    const [postDetails, setPostDetails] = useState({})
    const [postDate, setPostDate] = useState("")

    const { id } = useParams();

    const createDate = (dateTime) => {
        const date = new Date(dateTime)
        const day = date.getDay();
        const month = date.getMonth();
        const year = date.getFullYear();

        return `${month}/${day}/${year}`
    }

    useEffect(() => {
        getPostById(id).then(postObj => setPostDetails(postObj))
    }, [id])

    useEffect(() => {
        const dateString = createDate(postDetails.publishDateTime)
        setPostDate(dateString)
    }, [postDetails])

    if (!postDetails.id) {
        return <div>No details yet</div>
    }

    return (
        <>
            <Card className="m-4">
                <p className="text-left px2">{postDetails.title}</p>
                <img src={`${postDetails.ImageLocation}`} alt={`Image for ${postDetails.title}`}/>
                <p className="text-left px2">Content: {postDetails.content}</p>
                <p className="text-left px2">Published On: {postDate}</p>
                <p className="text-left px2">Posted By: {postDetails.userProfile.displayName}</p>
            </Card>
        </>
    )
}