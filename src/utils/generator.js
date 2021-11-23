import faker from 'faker'
import mongoose from 'mongoose'
import { random, capitalize } from 'lodash'
import { Category } from '../resources/category/category.model'
import { User } from '../resources/user/user.model'
import { Job } from '../resources/job/job.model'
import { JobApp } from '../resources/jobApp/jobApp.model'
import { Review } from '../resources/review/review.model'

const categories = [
  {
    name: 'Cleaning',
    defaultImageUrl: 'https://jobic.herokuapp.com/image-1637164557872.png',
  },
  {
    name: 'Ironing',
    defaultImageUrl: 'https://jobic.herokuapp.com/image-1637165007144.png',
  },
  {
    name: 'Car cleaning',
    defaultImageUrl: 'https://jobic.herokuapp.com/image-1637166143512.png',
  },
  {
    name: 'Delivery',
    defaultImageUrl: 'https://jobic.herokuapp.com/image-1637166163731.png',
  },
  {
    name: 'Dish washing',
    defaultImageUrl: 'https://jobic.herokuapp.com/image-1637166173734.png',
  },
  {
    name: 'Gardening',
    defaultImageUrl: 'https://jobic.herokuapp.com/image-1637166207061.png',
  },
]

export const generateCategories = async () => {
  try {
    await Category.countDocuments(async (err, count) => {
      if (!err && count === 0) {
        console.log('generating categories')
        await Category.insertMany(categories)
      }
    })
  } catch (e) {
    console.log('error', e)
  }
}

export const generateUser = async () => {
  const firstName = faker.unique(faker.name.firstName)

  return {
    firstName: firstName,
    lastName: faker.name.lastName(),
    email: `${firstName.toLowerCase()}@gmail.com`,
    phone: faker.phone.phoneNumber('06########'),
    password: 'jobic',
    summary: capitalize(faker.lorem.words(random(10, 30))),
  }
}

export const generateJob = async () => {
  const categories = await Category.find({}).lean().exec()
  const users = await User.find({}).lean().exec()
  const category = categories[Math.floor(Math.random() * categories.length)]
  const user = users[Math.floor(Math.random() * users.length)]._id

  return {
    name: capitalize(faker.lorem.words(random(1, 3))),
    city: faker.address.city(),
    address: faker.address.streetAddress(),
    imageUrl: category.defaultImageUrl,
    description: capitalize(faker.lorem.words(random(50, 150))),
    budget: Math.round(faker.datatype.number(random(3000, 9000)) / 50) * 50,
    categoryId: new mongoose.mongo.ObjectId(category._id),
    createdBy: new mongoose.mongo.ObjectId(user._id),
  }
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

  return {
    message: capitalize(faker.lorem.words(random(5, 30))),
    jobId: new mongoose.mongo.ObjectId(jobId),
    createdBy: new mongoose.mongo.ObjectId(userId),
  }
}

export const generateReviews = async () => {
  const users = await User.find({}).lean().exec()
  const randomReviews = Array(50)
    .fill()
    .map(() => ({
      description: capitalize(faker.lorem.words(random(5, 30))),
      rating: random(1, 5),
      createdBy: new mongoose.mongo.ObjectId(
        users[Math.floor(Math.random() * users.length)]._id
      ),
      ratedUser: new mongoose.mongo.ObjectId(
        users[Math.floor(Math.random() * users.length)]._id
      ),
    }))

  return randomReviews.filter((review) => review.createdBy !== review.ratedUser)
}

export const generateRandomData = async () => {
  try {
    await User.countDocuments(async (err, count) => {
      if (!err && count === 0) {
        console.log('generating random data')
        for (let step = 0; step < 30; step++) {
          await User.create(await generateUser())
          await Job.create(await generateJob())
          await JobApp.create(await generateJobApp())
        }
        await Review.insertMany(await generateReviews())
      }
    })
  } catch (e) {
    console.log('error', e.message)
  }
}
