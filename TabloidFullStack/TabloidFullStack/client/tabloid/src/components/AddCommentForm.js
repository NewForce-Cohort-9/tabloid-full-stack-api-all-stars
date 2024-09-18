import { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { addComment } from "../Managers/CommentManager.js";
import { useNavigate } from "react-router-dom";

export const AddCommentForm = ({ currentUser }) => {
  const [comment, setComment] = useState({});

  const navigate = useNavigate();

  //   post id hard-coded to 1 until post details is complete
  const handleSave = (event) => {
    event.preventDefault();
    if (comment.subject) {
      const singleComment = {
        postId: 1,
        userProfileId: currentUser.id,
        subject: comment.subject,
        content: comment.content,
        createDateTime: new Date().toISOString(),
      };

      addComment(singleComment).then((c) => {
        navigate("/posts/1/Comments");
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
