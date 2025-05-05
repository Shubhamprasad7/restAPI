const express = require('express');
const bodyParser = require('body-parser');

const booksRoutes = require('./routes/books');
const authorsRoutes = require('./routes/authors');

const app = express();
app.use(bodyParser.json());

app.use('/books', booksRoutes);
app.use('/authors', authorsRoutes);

app.get('/', (req, res) => res.send('Library API is running.'));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
