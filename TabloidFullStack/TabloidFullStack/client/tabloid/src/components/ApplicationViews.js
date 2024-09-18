import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import CommentList from "./CommentList.js";
import { PostList } from "./Post/PostList.js";
import { CategoryList } from "./CategoryList.js";
import { TagList } from "./TagList.js";
import { UserPostList } from "./Post/UserPostList.js";
import { PostDetails } from "./Post/PostDetails.js";
import { CategoryForm } from "./CategoryForm.js";

export default function ApplicationViews({ currentUser, id }) {
  return (
    <Routes>
      <Route path="/" element={<Hello />} />
      <Route path="/category" element={<CategoryList />} />
      <Route path="/posts" element={<PostList />} />
      <Route path="/myposts" element={<UserPostList />} />
      <Route path="/post/:id" element={<PostDetails />} />
      <Route path="/posts/:id/comments" element={<CommentList id={id} />} />

      <Route path="/newCategory" element={<CategoryForm />} />
      <Route path="/tags" element={<TagList />} />
    </Routes>
  );
}
