import { Document, model, Schema } from 'mongoose';

interface IUser extends Document {
  clerkUserId: string;
  firstName: string;
  lastName: string;
}

const UserSchema = new Schema<IUser>({
  clerkUserId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

export const User = model<IUser>('User', UserSchema);