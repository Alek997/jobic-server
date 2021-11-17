import faker from 'faker'
import mongoose from 'mongoose'
import { random, capitalize } from 'lodash'
import { Category } from '../resources/category/category.model'
import { User } from '../resources/user/user.model'
import { Job } from '../resources/job/job.model'
import { JobApp } from '../resources/jobApp/jobApp.model'
import { Review } from '../resources/review/review.model'

export const generateJob = async () => {
  const categories = await Category.find({}).lean().exec()
  const users = await User.find({}).lean().exec()

  const categoryId =
    categories[Math.floor(Math.random() * categories.length)]._id
  const userId = users[Math.floor(Math.random() * users.length)]._id

  const randomJob = {
    name: capitalize(faker.lorem.words(random(1, 3))),
    city: faker.address.city(),
    address: faker.address.streetAddress(),
    imageUrl: faker.image.imageUrl(400, 300, 'people', true, true),
    description: capitalize(faker.lorem.words(random(50, 150))),
    budget: Math.round(faker.datatype.number(random(3000, 9000)) / 50) * 50,
    categoryId: new mongoose.mongo.ObjectId(categoryId),
    createdBy: new mongoose.mongo.ObjectId(userId),
  }

  Job.create(randomJob)

  return randomJob
}

export const generateJobApp = async () => {
  const users = await User.find({}).lean().exec()

  const userId = users[Math.floor(Math.random() * users.length)]._id

  const jobs = await Job.find({
    _id: { $ne: new mongoose.mongo.ObjectId(userId) },
  })
    .lean()
    .exec()
  const jobId = jobs[Math.floor(Math.random() * jobs.length)]._id

  const randomJobApp = {
    message: capitalize(faker.lorem.words(random(5, 30))),
    jobId: new mongoose.mongo.ObjectId(jobId),
    createdBy: new mongoose.mongo.ObjectId(userId),
  }

  JobApp.create(randomJobApp)

  return randomJobApp
}

export const generateReview = async () => {
  const users = await User.find({}).lean().exec()

  const userId = users[Math.floor(Math.random() * users.length)]._id
  const ratedUserId = users[Math.floor(Math.random() * users.length)]._id

  if (userId === ratedUserId) {
    return null
  }
  const randomReview = {
    description: capitalize(faker.lorem.words(random(5, 30))),
    rating: random(1, 5),
    createdBy: new mongoose.mongo.ObjectId(userId),
    ratedUser: new mongoose.mongo.ObjectId(ratedUserId),
  }

  Review.create(randomReview)

  return randomReview
}
