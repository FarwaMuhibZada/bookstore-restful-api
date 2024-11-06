const express = require('express');
const authenticateJWT = require('../middleware/auth');
const authorizeRoles = require('../middleware/roles');
const Book = require('../models/Book');
const router = express.Router();

// Public Route: Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch books' });
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
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create book' });
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
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update book' });
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

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete book' });
  }
});

module.exports = router;
