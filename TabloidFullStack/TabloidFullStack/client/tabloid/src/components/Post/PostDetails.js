import { useEffect, useState } from "react";
import { getPostById } from "../../Managers/PostManager.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Card } from "reactstrap";

export const PostDetails = () => {
  const [postDetails, setPostDetails] = useState({});
  const [postDate, setPostDate] = useState("");
  const [currentUser, setCurrentUser] = useState({})

  const navigate = useNavigate()

  const { id } = useParams();

  const createDate = (dateTime) => {
    const date = new Date(dateTime);
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    getPostById(id).then((postObj) => setPostDetails(postObj));
  }, [id]);

  useEffect(() => {
    const dateString = createDate(postDetails.publishDateTime);
    setPostDate(dateString);
  }, [postDetails]);

  useEffect(() => {
    const user = localStorage.getItem("userProfile")
      const parsedUser = JSON.parse(user)
      setCurrentUser(parsedUser)
  }, [])

  if (!postDetails.id) {
    return <div>No details yet</div>;
  }

  return (
    <>
      <Card className="m-4">
        <p className="text-left px2">{postDetails.title}</p>
        <img
          src={`${postDetails.imageLocation}`}
          alt={`Image for ${postDetails.title}`}
        />
        <p className="text-left px2">Content: {postDetails.content}</p>
        <p className="text-left px2">Published On: {postDate}</p>
        <p className="text-left px2">
          Posted By: {postDetails.userProfile.displayName}
        </p>
        {currentUser.id === postDetails.userProfileId ? 
          <>
            <Button color="danger" onClick={() => navigate(`/posts/delete/${id}`, {state: { post: postDetails }})}>
              Delete Post
            </Button>
            <Button color="warning" onClick={() => navigate(`/posts/edit/${id}`, {state: {post: postDetails}})}>
              Edit Post
            </Button>
          </>
          :
          ""
          }
          <Link to={"/myposts"}>My Posts</Link>
          <Link to={"/posts"}>All Posts</Link>
      </Card>
      <Link to={`/posts/${id}/comments`}>View Comments</Link>
    </>
  );
};
