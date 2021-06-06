import mongoose from 'mongoose'

const jobAppSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      maxlength: 250,
    },
    status: {
      type: String,
      required: true,
      enum: ['employed', 'pending', 'not_employed'],
      default: 'pending',
    },
    appliedBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
    ad: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'ad',
      required: true,
    },
  },
  { timestamps: true }
)

export const Item = mongoose.model('jobApp', jobAppSchema)
