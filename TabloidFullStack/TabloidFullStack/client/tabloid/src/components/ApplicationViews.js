import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import CommentList from "./CommentList.js";
import { PostList } from "./Post/PostList.js";
import { CategoryList } from "./CategoryList.js";
import { TagList } from "./TagList.js";
import { UserPostList } from "./Post/UserPostList.js";

export default function ApplicationViews({ currentUser }) {
  return (
    <Routes>
      <Route path="/" element={<Hello />} />
        <Route path="/category" element={<CategoryList />} />
      <Route path="/posts" element={<PostList />} />
      {/* hard-coding postid to 1 until post details is done */}
      <Route
        path="/posts/:postId/comments"
        element={<CommentList postId={1} />}
      />
      <Route path="/myposts" element={<UserPostList />} />
      <Route path="/tags" element={<TagList />} />
    </Routes>
  );
}
