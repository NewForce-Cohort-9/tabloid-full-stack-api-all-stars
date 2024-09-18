import React, { useState, useEffect } from "react";
import { getCommentsByPostId } from "../Managers/CommentManager.js";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

export default function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const getComments = () => {
    getCommentsByPostId(postId).then((allComments) => setComments(allComments));
  };

  useEffect(() => {
    if (postId) {
      getComments();
    }
  }, [postId]);

  return (
    <>
      {/* will temporarily link back to all posts until post details is finished */}
      <h2
        onClick={() => {
          navigate("/posts");
        }}
      >
        {comments[0]?.post.title} comments
      </h2>
      <Button
        onClick={() => {
          navigate("/posts/1/comments/create");
        }}
      >
        Add New Comment
      </Button>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>SUBJECT: {comment.subject}</p>
          <p>CONTENT: {comment.content}</p>
          <p>AUTHOR: {comment.userProfile?.displayName}</p>
          <p>DATE: {comment.createDateTime}</p>
          <hr />
        </div>
      ))}
    </>
  );
}
