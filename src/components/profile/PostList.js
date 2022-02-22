import React from "react";
import Post from './Post'
const PostList = ({ posts, editPost }) => {

  return (
    <>
      {posts.map((post, index) => {
        if (index + 1 !== posts.length) {
          return (
            <div key={post.id}>
              <Post post={post} editPost={editPost} />
              <hr className="divider" />
            </div>
          )
        } else {
          return (
            <div key={post.id}>
              <Post post={post} editPost={editPost} />
            </div>
          )
        }
      })}
    </>
  );
};

export default PostList;