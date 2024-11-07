const express = require('express');
const authenticateJWT = require('../middleware/auth');
const authorizeRoles = require('../middleware/roles');
const Book = require('../models/Book');

const router = express.Router();

// Public Route: Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    return res.json(books); // Added return for consistency
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch books' }); // Added return for consistency
  }
});

// Public Route: Get a single book by ID
router.get('/:id', async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.json(book); // Added return for consistency
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch book', error: error.message }); // Added return for consistency
  }
});

// Admin-only Route: Add a new book
router.post('/', authenticateJWT, authorizeRoles('admin'), async (req, res) => {
  const { title, author, description } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: 'Title and Author are required' });
  }

  try {
    const newBook = new Book({ title, author, description });
    await newBook.save();
    return res.status(201).json(newBook); // Added return for consistency
  } catch (error) {
    return res.status(400).json({ message: 'Failed to create book' }); // Added return for consistency
  }
});

// Admin-only Route: Edit a book (update)
router.put('/:id', authenticateJWT, authorizeRoles('admin'), async (req, res) => {
  const { title, author, description } = req.body;
  const bookId = req.params.id;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { title, author, description },
      { new: true },
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.json(updatedBook); // Added return for consistency
  } catch (error) {
    return res.status(400).json({ message: 'Failed to update book' }); // Added return for consistency
  }
});

// Admin-only Route: Delete a book
router.delete('/:id', authenticateJWT, authorizeRoles('admin'), async (req, res) => {
  const bookId = req.params.id;

  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.json({ message: 'Book deleted successfully' }); // Added return for consistency
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete book' }); // Added return for consistency
  }
});

module.exports = router;
