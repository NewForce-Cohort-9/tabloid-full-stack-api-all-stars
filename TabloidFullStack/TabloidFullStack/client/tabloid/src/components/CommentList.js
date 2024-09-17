import React, { useState, useEffect } from "react";
import { getCommentsByPostId } from "../Managers/CommentManager.js";
import { useNavigate } from "react-router-dom";

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
