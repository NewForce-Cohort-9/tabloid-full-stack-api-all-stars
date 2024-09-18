import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import { PostList } from "./Post/PostList.js";
import { CategoryList } from "./Category/CategoryList.js";
import { TagList } from "./TagList.js";
import { UserPostList } from "./Post/UserPostList.js";
import { CategoryForm } from "./Category/CategoryForm.js";
import { PostDetails } from "./Post/PostDetails.js";
export default function ApplicationViews({ currentUser }) {

 return(
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/category" element={<CategoryList />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/myposts" element={<UserPostList />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/newCategory" element={<CategoryForm />} />
        <Route path="/tags" element={<TagList />} />

      </Routes>
   );
 
}