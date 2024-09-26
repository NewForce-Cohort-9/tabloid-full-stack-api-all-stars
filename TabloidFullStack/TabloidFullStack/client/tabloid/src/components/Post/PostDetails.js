import { useEffect, useState } from "react";
import { getPostById } from "../../Managers/PostManager.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Card } from "reactstrap";
import { getPostTagsByPostId } from "../../Managers/PostTagManager.js";
import { getReactionsByPostId } from "../../Managers/PostReactionManager.js";

export const PostDetails = () => {
  const [postDetails, setPostDetails] = useState({});
  const [postDate, setPostDate] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [postTags, setPostTags] = useState([]);
  const [postReactions, setPostReactions] = useState([]);

  const navigate = useNavigate();

  const { id } = useParams();

  const createDate = (dateTime) => {
    const date = new Date(dateTime);
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    getPostTagsByPostId(id).then((postTagsArr) => setPostTags(postTagsArr));
  }, []);

  useEffect(() => {
    getPostById(id).then((postObj) => setPostDetails(postObj));
  }, [id]);

  useEffect(() => {
    const dateString = createDate(postDetails.publishDateTime);
    setPostDate(dateString);
  }, [postDetails]);

  useEffect(() => {
    const user = localStorage.getItem("userProfile");
    const parsedUser = JSON.parse(user);
    setCurrentUser(parsedUser);
  }, []);

  useEffect(() => {
    getReactionsByPostId(id).then((postReactionsArr) =>
      setPostReactions(postReactionsArr)
    );
  }, []);

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
        <p>Reactions:</p>
        {postReactions.map((reactionObj) => {
          return (
            <div key={reactionObj.reaction.id}>
              <span>{reactionObj.reactionCount}</span>
              <img
                src={reactionObj.reaction.imageLocation}
                alt={reactionObj.reaction.name}
                title={reactionObj.reaction.name}
                width="25px"
                height="auto"
              />
            </div>
          );
        })}

        {currentUser.id === postDetails.userProfileId ? (
          <>
            <div>
              <p>Tags:</p>
              {postTags.map((tagObj) => {
                return <p>{tagObj.tag.name}</p>;
              })}
            </div>
            <Button
              color="danger"
              onClick={() =>
                navigate(`/posts/delete/${id}`, {
                  state: { post: postDetails },
                })
              }
            >
              Delete Post
            </Button>
            <Button
              color="warning"
              onClick={() =>
                navigate(`/posts/edit/${id}`, { state: { post: postDetails } })
              }
            >
              Edit Post
            </Button>
            <Button
              color="info"
              onClick={() =>
                navigate(`/posts/tags/${id}`, { state: { post: postDetails } })
              }
            >
              Manage Tags
            </Button>
          </>
        ) : (
          ""
        )}
        <Link to={"/myposts"}>My Posts</Link>
        <Link to={"/posts"}>All Posts</Link>
      </Card>
      <Link to={`/posts/${id}/comments`}>View Comments</Link>
    </>
  );
};
