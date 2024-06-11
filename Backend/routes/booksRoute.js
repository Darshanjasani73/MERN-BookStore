import express from 'express';
import mongoose from 'mongoose';
import { Book } from '../models/bookModel.js';
import multer from 'multer';
import { body, validationResult } from 'express-validator';

const router = express.Router();
const upload = multer();

// Middleware to handle validation errors
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Route for saving a new book
router.post(
  '/',
  upload.single('thumbnail'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required'),
    body('publishYear').isInt({ min: 1000, max: new Date().getFullYear() }).withMessage('Publish Year is invalid')
  ],
  validateRequest,
  async (req, res) => {
    try {
      let thumbnailBase64 = '';
      if (req.file) {
        thumbnailBase64 = req.file.buffer.toString('base64');
      }

      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
        thumbnail: thumbnailBase64,
      };

      const book = await Book.create(newBook);
      return res.status(201).send(book);
    } catch (error) {
      console.error('Error saving book:', error.message);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
);

// Route for updating a book
router.put(
  '/:id',
  upload.single('thumbnail'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required'),
    body('publishYear').isInt({ min: 1000, max: new Date().getFullYear() }).withMessage('Publish Year is invalid')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { id } = req.params;

      let updateData = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      };

      if (req.file) {
        updateData.thumbnail = req.file.buffer.toString('base64');
      } else {
        const book = await Book.findById(id);
        if (!book) {
          return res.status(404).json({ message: 'Book not found' });
        }
        updateData.thumbnail = book.thumbnail;
      }

      const result = await Book.findByIdAndUpdate(id, updateData, { new: true });
      if (!result) {
        return res.status(404).json({ message: 'Book not found' });
      }

      return res.status(200).send({ message: 'Book updated successfully', book: result });
    } catch (error) {
      console.error('Error updating book:', error.message);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
);

// Route for getting all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error('Error fetching books:', error.message);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Route for getting a single book by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).json(book);
  } catch (error) {
    console.error('Error fetching book:', error.message);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Route for deleting a book
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error.message);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

export default router;
