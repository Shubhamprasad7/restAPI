const express = require('express');
const router = express.Router();

let authors = [];
let idCounter = 1;

router.get('/', (req, res) => res.json(authors));

router.get('/:id', (req, res) => {
  const author = authors.find(a => a.id === parseInt(req.params.id));
  author ? res.json(author) : res.status(404).json({ error: 'Author not found' });
});

router.post('/', (req, res) => {
  const { name, bio } = req.body;
  const author = { id: idCounter++, name, bio };
  authors.push(author);
  res.status(201).json(author);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = authors.findIndex(a => a.id === id);
  if (index === -1) return res.status(404).json({ error: 'Author not found' });

  authors[index] = { ...authors[index], ...req.body };
  res.json(authors[index]);
});

router.delete('/:id', (req, res) => {
  authors = authors.filter(a => a.id !== parseInt(req.params.id));
  res.status(204).send();
});

module.exports = router;
