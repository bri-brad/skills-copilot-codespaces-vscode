//create web server
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const comments = [
  { id: 1, text: 'This is a comment' },
  { id: 2, text: 'This is another comment' },
];

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const newComment = req.body;
  comments.push(newComment);
  res.status(201).json(newComment);
});

app.delete('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = comments.findIndex((comment) => comment.id === id);
  
  if (index !== -1) {
    comments.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
});