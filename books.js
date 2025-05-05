const express = require('express');
const router = express.Router();

let books = []; // In-memory store
let idCounter = 1;

// GET /books
router.get('/', (req, res) => {
  res.json(books);
});

// GET /books/:id
router.get('/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  book ? res.json(book) : res.status(404).json({ error: 'Book not found' });
});

// POST /books
router.post('/', (req, res) => {
  const { title, author, isbn, copies } = req.body;
  const book = { id: idCounter++, title, author, isbn, copies };
  books.push(book);
  res.status(201).json(book);
});

// PUT /books/:id
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);
  if (index === -1) return res.status(404).json({ error: 'Book not found' });

  books[index] = { ...books[index], ...req.body };
  res.json(books[index]);
});

// DELETE /books/:id
router.delete('/:id', (req, res) => {
  books = books.filter(b => b.id !== parseInt(req.params.id));
  res.status(204).send();
});

module.exports = router;
