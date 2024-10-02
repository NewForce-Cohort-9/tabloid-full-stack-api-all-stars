import { useEffect, useState } from "react";
import { getAllPostsBySubscriberId } from "../../Managers/PostManager.js";
import { Post } from "./Post.js";

export const SubscribedPostList = ({ currentUser }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (currentUser?.id) {
      getAllPostsBySubscriberId(currentUser.id)
        .then((postArr) => setPosts(postArr))
        .catch((error) => console.error("Error fetching posts:", error));
    }
  }, [currentUser]);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="cards-column">
            {posts?.length > 0
              ? posts?.map((post) => <Post key={post.id} post={post} />)
              : ""}
          </div>
        </div>
      </div>
    </>
  );
};
