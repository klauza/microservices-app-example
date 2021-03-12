import React, { useState } from 'react';
import axios from 'axios';

// we need to pass post id that we need to get associated with this comment
export default ({ postId }) => {
  const [content, setContent] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    // we use content and postId to post a comment

    await axios.post(`http://posts.com/posts/${postId}/comments`, {
      content,
    });

    setContent('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
