import mongoose, { Document, Model, Schema } from 'mongoose';

interface IUser extends Document {
  googleId: string;
  name: string;
  email: string;
  photo: string;
}

const UserSchema: Schema<IUser> = new Schema<IUser>({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  photo: { type: String },
});

const UserModel: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
