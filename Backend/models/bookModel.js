import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishYear: { type: Number, required: true },
  thumbnail: { type: String, required: true }, // Base64 string
}
,
{ 
  timestamps: true,
}
); 

export const Book = mongoose.model('Book', bookSchema);
