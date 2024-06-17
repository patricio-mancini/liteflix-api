import mongoose, { Document, Model, Schema } from 'mongoose';

interface ISequence extends Document {
  name: string;
  value: number;
}

const SequenceSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  value: {
    type: Number,
    required: true
  }
});

const SequenceModel: Model<ISequence> = mongoose.model<ISequence>('Sequence', SequenceSchema);

export default SequenceModel;
