import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      maxlength: 250,
    },
    budget: {
      type: String,
      required: true,
      maxlength: 50,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'category',
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
