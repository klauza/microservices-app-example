const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// 1.1 any incoming event is going to be thrown into events array
const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  // 1.2 push to the end of an array
  events.push(event);

  axios.post('http://localhost:4000/events', event).catch((err) => {
    console.log(err.message);
  });
  axios.post('http://localhost:4001/events', event).catch((err) => {
    console.log(err.message);
  });
  axios.post('http://localhost:4002/events', event).catch((err) => {
    console.log(err.message);
  });
  axios.post('http://localhost:4003/events', event).catch((err) => {
    console.log(err.message);
  });

  res.send({ status: 'OK' });
});

// 1.3 retrieve all the events ever occured
app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});
