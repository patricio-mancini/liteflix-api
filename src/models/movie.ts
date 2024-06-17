import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IMovie extends Document {
  id: number;
  userId: string;
  title: string;
  filePath: string;
  createdAt: Date;
}

const MovieSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    minlength: 2
  },
  filePath: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const MovieModel: Model<IMovie> = mongoose.model<IMovie>('Movie', MovieSchema);

export default MovieModel;
