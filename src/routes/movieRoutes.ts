import { Router, Request, Response } from 'express';
import multer from 'multer';
import Movie, { IMovie } from '../models/movie';
import SequenceModel from '../models/sequence';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import fs from 'fs';

const router: Router = Router();

const uploadDir = path.join(__dirname, 'media');
fs.existsSync(uploadDir) || fs.mkdirSync(uploadDir);

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and JPG files are allowed.'));
    }
  }
});

// Function to get the next sequence number
const getNextSequenceValue = async (sequenceName: string): Promise<number> => {
  const sequenceDocument = await SequenceModel.findOneAndUpdate(
    { name: sequenceName },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument.value;
};

router.post('/movies', upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).send('Unauthorized');
    }

    const { title } = req.body;
    const userId = req.user.id;
    const file = req.file;

    if (!file) {
      return res.status(400).send('No file uploaded');
    }

    const timestamp = Date.now();
    const uniqueSuffix = uuidv4();
    const newFilename = `${timestamp}-${uniqueSuffix}.jpeg`;
    const filePath = `/media/${newFilename}`;

    const resizedImageBuffer = await sharp(file.buffer)
      .resize({ width: 342 })
      .jpeg()
      .toBuffer();

    fs.writeFileSync(path.join(uploadDir, newFilename), resizedImageBuffer);

    const newMovieId = await getNextSequenceValue('movieId');

    const newMovie: IMovie = new Movie({
      id: newMovieId,
      userId,
      title,
      filePath,
      createdAt: new Date()
    });

    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/movies', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).send('Unauthorized');
    }

    const userId = req.user.id;
    const latestMovies: IMovie[] = await Movie.find({ userId }).sort({ createdAt: -1 }).limit(4);

    res.status(200).json(latestMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
