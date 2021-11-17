import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxlength: 50,
  },
  defaultImageUrl: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  },
})

export const Category = mongoose.model('category', categorySchema)
