const express = require('express');
// const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const axios = require('axios');

const cors = require('cors');

const app = express();

// app.use(bodyParser.json());
app.use(express.json());
// app.use(express.urlencoded());

app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  // if undefined, give an empty array
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content, status: 'pending' });

  commentsByPostId[req.params.id] = comments;

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: 'pending',
    },
  });

  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  console.log('Event received', req.body.type);

  const { type, data } = req.body;

  // find an propriate comment stored in commentsByPostId
  // & UPDATE STATUS
  if (type === 'CommentModerated') {
    const { postId, id, status, content } = data;

    const comments = commentsByPostId[postId];
    // iterate through comments and find a comment we want to update
    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    // and update the status that has been pulled out of data [const { postId, id, status } = data;]
    comment.status = status;

    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        status,
        postId,
        content,
      },
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log('listening on 4001');
});
