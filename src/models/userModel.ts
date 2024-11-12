import mongoose, { Schema, Document, Types } from "mongoose";
import bcrypt from "bcrypt";



export interface IUser extends Document {
    _id: string;
  username: string;
  password: string;
  isAdmin: boolean;
  hasVoted: boolean;
  votedFor: Types.ObjectId | null;
  comparePassword(userPassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  password: { type: String, required: [true, "Password is Required!"] },
  isAdmin: { type: Boolean, default: false },
  hasVoted: { type: Boolean, default: false },
  votedFor: { type: Schema.Types.ObjectId || null, ref: "candidates" },
});
  
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function (
  userPassword: string
): Promise<boolean> {
  return bcrypt.compare(userPassword, this.password);
};

UserSchema.index({ username: 1 });


export default mongoose.model<IUser>("users", UserSchema);
