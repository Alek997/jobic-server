import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
  },
  { timestamps: true }
)

export const Category = mongoose.model('category', categorySchema)
