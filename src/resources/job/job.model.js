import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1500,
    },
    categoryId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'category',
      required: true,
    },
    budget: {
      type: Number,
      required: true,
      maxlength: 50,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: true }
)

export const Job = mongoose.model('job', jobSchema)
