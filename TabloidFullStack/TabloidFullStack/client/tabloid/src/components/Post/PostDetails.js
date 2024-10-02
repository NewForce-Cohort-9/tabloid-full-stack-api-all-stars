import { useEffect, useState } from "react";
import { getPostById } from "../../Managers/PostManager.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Card } from "reactstrap";
import { getPostTagsByPostId } from "../../Managers/PostTagManager.js";
import { getReactionsByPostId } from "../../Managers/PostReactionManager.js";
import AddReactionToPost from "./AddPostReaction.js";
import CreateNewReaction from "./CreateNewReaction.js";
import AddNewSubscription from "../Subscriptions/AddSubscription.js";

export const PostDetails = () => {
  const [postDetails, setPostDetails] = useState({});
  const [postDate, setPostDate] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [postTags, setPostTags] = useState([]);
  const [postReactions, setPostReactions] = useState([]);
  const [readingMin, setReadingMin] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  const createDate = (dateTime) => {
    const date = new Date(dateTime);
    let temp = { day: "numeric", month: "numeric", year: "numeric" };
    let dateFormat = date.toLocaleDateString(undefined, temp);
    let [month, day, year] = dateFormat.split("/");

    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    if (postDetails.content) {
      const wordArr = postDetails.content.split(" ");
      const wordCount = wordArr.length;
      let minutes = Math.ceil(wordCount / 265);
      console.log(minutes);
      if (minutes === 1) {
        setReadingMin("1 minute");
      } else {
        setReadingMin(`${minutes} minutes`);
      }
    }
  }, [postDetails]);

  useEffect(() => {
    getPostTagsByPostId(id).then((postTagsArr) => setPostTags(postTagsArr));
  }, []);

  useEffect(() => {
    getPostById(id).then((postObj) => setPostDetails(postObj));
  }, [id]);

  useEffect(() => {
    const dateString = createDate(postDetails?.publishDateTime);
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
        <p className="text-left px2">
          <strong>Estimated reading time: </strong> {readingMin}
        </p>
        <img
          src={`${postDetails.imageLocation}`}
          alt={`Image for ${postDetails.title}`}
        />
        <p className="text-left px2">Published On: {postDate}</p>
        <p className="text-left px2">
          Posted By: {postDetails.userProfile.displayName}
        </p>
        <AddNewSubscription currentUser={currentUser} />
        <p>Reactions:</p> <AddReactionToPost currentUser={currentUser} />
        {currentUser.userTypeId === 1 ? <CreateNewReaction /> : null}
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
        <p className="text-left px2">Content: {postDetails.content}</p>
        <div>
              <p>Tags:</p>
              {postTags.map((tagObj) => {
                return <p key={tagObj.id}>{tagObj.tag.name}</p>;
              })}
        </div>

            {(currentUser.id === postDetails.userProfileId) && (
            <Button
              color="warning"
              onClick={() =>
                navigate(`/posts/edit/${id}`, { state: { post: postDetails } })
              }
            >
              Edit Post
            </Button>
            )}

        {((currentUser.id === postDetails.userProfileId) || (currentUser.userTypeId === 1)) && (
          <>
            <Button
                color="info"
                onClick={() =>
                  navigate(`/posts/tags/${id}`, { state: { post: postDetails } })
                }
              >
                Manage Tags
            </Button>
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
            </>
            )}
        <Link to={"/myposts"}>My Posts</Link>
        <Link to={"/posts"}>All Posts</Link>
      </Card>
      <Link to={`/posts/${id}/comments`}>View Comments</Link>
    </>
  );
};
