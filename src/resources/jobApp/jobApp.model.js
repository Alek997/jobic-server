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
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
    jobId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'job',
      required: true,
    },
  },
  { timestamps: true }
)

export const JobApp = mongoose.model('jobApp', jobAppSchema)
