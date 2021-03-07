const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
// query service receives events PostCreated and CommentCreated

const posts = {};
// example of 'posts'
// posts === {
// 'f43f32': {
//   id: 'f43f32',
//   title: 'post title',
//   comments: [{id: 'xx', content: 'comm'}, {id: 'yy', content: 'comm2'}]
// },
// 'f43f33': {
//   id: 'f43f33',
//   title: 'post title',
//   comments: [{id: 'xx', content: 'comm'}, {id: 'yy', content: 'comm2'}]
// }
// }

// route handlers
app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;

    const post = post[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;
  }

  console.log(posts);

  res.send({});
});

app.listen(4002, () => {
  console.log('Listening 4002');
});
