import { trimEnd } from 'lodash'
import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxlength: 50,
  },
})

export const Category = mongoose.model('category', categorySchema)
