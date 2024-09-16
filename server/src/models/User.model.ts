
import mongoose, { Schema } from "mongoose"


// Define your schema here

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  photoUrl: { type: String, default: '' },
  rule: { type: Number, default: 1 },
}, {
  timestamps: true,
});

const UserModel = mongoose.model('Users', UserSchema)
export default UserModel