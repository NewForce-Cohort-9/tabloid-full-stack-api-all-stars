import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import CommentList from "./CommentList.js";
import { PostList } from "./Post/PostList.js";
import { TagList } from "./Tags/TagList.js";
import { CategoryList } from "./Category/CategoryList.js";
import { UserPostList } from "./Post/UserPostList.js";
import { AddCommentForm } from "./AddCommentForm.js";
import { CategoryForm } from "./Category/CategoryForm.js";
import { PostDetails } from "./Post/PostDetails.js";
import { TagForm } from "./Tags/TagForm.js";
import { DeleteCategory } from "./Category/DeleteCategory.js";
import { EditCategory } from "./Category/EditCategory.js";

export default function ApplicationViews({ currentUser }) {
  return (
    <Routes>
      <Route path="/" element={<Hello />} />
      <Route path="/category" element={<CategoryList />} />
      <Route path="/newCategory" element={<CategoryForm />} />
      <Route path="/deleteCategory/:categoryId" element={<DeleteCategory />} />
      <Route path="/editCategory/:categoryId" element={<EditCategory />} />
      <Route path="/posts" element={<PostList />} />
      <Route
        path="/posts/:id/comments/create"
        element={<AddCommentForm currentUser={currentUser} />}
      />
      <Route path="/myposts" element={<UserPostList />} />
      <Route path="/post/:id" element={<PostDetails />} />
      <Route path="/posts/:id/comments" element={<CommentList />} />
      <Route path="/tags" element={<TagList />} />
    </Routes>
  );
}
