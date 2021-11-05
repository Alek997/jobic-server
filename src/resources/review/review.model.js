import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      maxlength: 1500,
    },
    rating: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
    ratedUser: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { timestamps: true }
)

reviewSchema.index({ createdBy: 1, ratedUser: 1 }, { unique: true })

export const Review = mongoose.model('review', reviewSchema)
