import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "../Hello.js";
import { CategoryList } from "../Category/CategoryList.js";
import { CategoryForm } from "../Category/CategoryForm.js";
import { DeleteCategory } from "../Category/DeleteCategory.js";
import { EditCategory } from "../Category/EditCategory.js";
import { PostList } from "../Post/PostList.js";
import { AddCommentForm } from "../Comment/AddCommentForm.js";
import { UserPostList } from "../Post/UserPostList.js";
import { PostDetails } from "../Post/PostDetails.js";
import { CreatePost } from "../Post/CreatePost.js";
import { DeletePost } from "../Post/DeletePost.js";
import { TagList } from "../Tags/TagList.js";
import { TagForm } from "../Tags/TagForm.js";
import { CommentList } from "../Comment/CommentList.js";


export const AdminViews = ({ currentUser }) => {
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
      <Route path="/newpost" element={<CreatePost />} />
      <Route
        path="/posts/:id/comments"
        element={<CommentList currentUser={currentUser} />}
      />
      <Route path="/posts/delete/:id" element={<DeletePost />} />
      <Route path="/tags" element={<TagList />} />
      <Route path="/newTagAdded" element={<TagForm />} />
    </Routes>
  );
}
