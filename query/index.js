const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
//

// route handlers
app.get('/posts', (req, res) => {});

app.post('/events', (req, res) => {});

app.listen(4002, () => {
  console.log('Listening 4002');
});
