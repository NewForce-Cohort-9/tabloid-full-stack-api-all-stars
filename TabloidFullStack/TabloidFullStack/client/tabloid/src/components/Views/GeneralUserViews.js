import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "../Hello.js";

import { PostList } from "../Post/PostList.js";
import { AddCommentForm } from "../Comment/AddCommentForm.js";
import { UserPostList } from "../Post/UserPostList.js";
import { PostDetails } from "../Post/PostDetails.js";
import { CreatePost } from "../Post/CreatePost.js";
import { DeletePost } from "../Post/DeletePost.js";
import { EditPost } from "../Post/EditPost.js";
import { CommentList } from "../Comment/CommentList.js";
import { PostTags } from "../Post/PostTags.js";
import { SubscribedPostList } from "../Post/SubscribedPostList.js";

export const GeneralUserViews = ({ currentUser }) => {
  return (
    <Routes>
      <Route path="/" element={<SubscribedPostList currentUser={currentUser} />} />
      <Route path="/posts" element={<PostList />} />
      <Route
        path="/posts/:id/comments/create"
        element={<AddCommentForm currentUser={currentUser} />}
      />
      <Route path="/myposts" element={<UserPostList />} />
      <Route path="/post/:id" element={<PostDetails />} />
      <Route path="/newpost" element={<CreatePost />} />
      <Route
        path="/posts/:id/comments"
        element={<CommentList currentUser={currentUser} />}
      />
      <Route path="/posts/delete/:id" element={<DeletePost />} />
      <Route path="/posts/edit/:id" element={<EditPost />} />
      <Route path="/posts/tags/:id" element={<PostTags />} />
    </Routes>
  );
};
