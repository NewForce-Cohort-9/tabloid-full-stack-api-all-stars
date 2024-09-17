import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import CommentList from "./CommentList.js";

export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="Comments" element={<CommentList />} />
      </Routes>
   );
 
}