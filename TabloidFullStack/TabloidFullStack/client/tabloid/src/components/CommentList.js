import React, { useState, useEffect } from "react";
import { getCommentsByPostId } from "../Managers/CommentManager.js";

export default function CommentList() {
  const [comments, setComments] = useState([]);

  const getComments = () => {
    getCommentsByPostId().then((allComments) => setComments(allComments));
  };

  useEffect(() => {
    getComments();
  }, []);
  return (
    <>
      {comments.map((comment) => (
        <p key={comment.id}>{comment.subject}</p>
      ))}
    </>
  );
}
