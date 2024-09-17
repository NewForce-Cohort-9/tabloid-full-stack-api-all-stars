import { Card } from "reactstrap"

export const Post = ({ post }) => {
    return (
        <Card className="m-4">
            <p className="text-left px2">{post.title}</p>
            <p className="text-left px2">Posted By: {post.userProfile.displayName}</p>
            <p className="text-left px2">Category: {post.category.name}</p>
        </Card>
    )
}