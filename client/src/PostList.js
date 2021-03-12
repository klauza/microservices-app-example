import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

// component making request to our post and list all posts ever been created
export default () => {
  const [posts, setPosts] = useState({}); // posts expect an object

  const fetchPosts = async () => {
    // const res = await axios.get('http://localhost:4000/posts');
    const res = await axios.get('http://posts.com/posts'); // query service

    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // object.values is built-in function JS that gives back an array of all the values inside of 'posts' object
  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: '30%', marginBottom: '20px' }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};
