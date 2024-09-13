import mongoose, { Schema } from "mongoose"

const SupplierSchema = new Schema({
  name: { type: String, required: true },
  product: { type: String },
  categories: { type: [String] },
  price: { type: Number },
  contact: { type: String },
  isTaking: { type: Number, default: 0, enum: [0, 1] },
  photoUrl: { type: String },
  slug: { type: String }
}, {
  timestamps: true,
});

const SupplierModel = mongoose.model('Suppliers', SupplierSchema)
export default SupplierModel