import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const router = express.Router();

const conn = mongoose.createConnection(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

conn.once('open', () => {   
  // Initialize GridFS
  const gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads',
  });

  // Define routes for handling file uploads, downloads, etc.
  router.get('/:filename', async (req, res) => {
    try {
      const files = await gfs.find({ filename: req.params.filename }).toArray();
      if (!files || files.length === 0) {
        return res.status(404).json({ err: 'No files exist' });
      }
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    } catch (err) {
      res.status(500).json({ err });
    }
  });
});

export default router;
