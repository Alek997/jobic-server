import mongoose from 'mongoose'

var imageSchema = new mongoose.Schema({
  name: String,
  desc: String,
  img: {
    data: Buffer,
    contentType: String,
  },
})

export const Image = mongoose.model('image', imageSchema)
