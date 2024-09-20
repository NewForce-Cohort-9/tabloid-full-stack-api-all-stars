import { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { addComment } from "../Managers/CommentManager.js";
import { useNavigate, useParams } from "react-router-dom";

export const AddCommentForm = ({ currentUser }) => {
  const [comment, setComment] = useState({});

  const { id } = useParams();

  const navigate = useNavigate();

  const handleSave = (event) => {
    event.preventDefault();
    if (comment.subject) {
      const singleComment = {
        postId: parseInt(id),
        userProfileId: currentUser.id,
        subject: comment.subject,
        content: comment.content,
        createDateTime: new Date().toISOString(),
      };

      addComment(singleComment).then((c) => {
        navigate(`/posts/${id}/Comments`);
      });
    } else {
      window.alert("Please give your comment a subject!");
    }
  };

  return (
    <Form onSubmit={handleSave}>
      <FormGroup>
        <Label for="subject">Subject</Label>
        <Input
          id="subject"
          name="subject"
          type="text"
          onChange={(event) => {
            const commentCopy = { ...comment };
            commentCopy.subject = event.target.value;
            setComment(commentCopy);
          }}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label for="content">Content</Label>
        <Input
          id="content"
          name="content"
          type="textarea"
          onChange={(event) => {
            const commentCopy = { ...comment };
            commentCopy.content = event.target.value;
            setComment(commentCopy);
          }}
        ></Input>
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
};
