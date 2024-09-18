import { Link } from "react-router-dom"
import { Card } from "reactstrap"

export const Post = ({ post }) => {
    return (
        <Card className="m-4">
            <Link to={`/post/${post.id}`}>
                <p className="text-left px2">{post.title}</p>
            </Link>
            <p className="text-left px2">Posted By: {post.userProfile.displayName}</p>
            <p className="text-left px2">Category: {post.category.name}</p>
        </Card>
    )
}