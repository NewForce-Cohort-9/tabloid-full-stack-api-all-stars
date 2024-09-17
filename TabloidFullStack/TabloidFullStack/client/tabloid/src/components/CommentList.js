import React, { useState, useEffect } from "react";
import { getCommentsByPostId } from "../Managers/CommentManager.js";

export default function CommentList({ postId }) {
  const [comments, setComments] = useState([]);

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
      {comments.map((comment) => (
        <p key={comment.id}>{comment.subject}</p>
      ))}
    </>
  );
}
