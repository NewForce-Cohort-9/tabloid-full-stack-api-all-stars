import React, { useState, useEffect } from "react";
import { getCommentsByPostId } from "../Managers/CommentManager.js";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "reactstrap";

export default function CommentList() {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const getComments = () => {
    getCommentsByPostId(id).then((allComments) => setComments(allComments));
  };

  useEffect(() => {
    if (id) {
      getComments();
    }
  }, [id]);

  return (
    <>
      <h2
        onClick={() => {
          navigate(`/post/${id}`);
        }}
      >
        {comments[0]?.post.title} comments
      </h2>
      <Button
        onClick={() => {
          navigate(`/posts/${id}/comments/create`);
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
