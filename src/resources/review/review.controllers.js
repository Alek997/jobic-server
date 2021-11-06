import { crudControllers } from '../../utils/crud'
import { User } from '../user/user.model'
import { Review } from './review.model'

export const findByUser = async (req, res) => {
  try {
    const docs = await Review.find({ ratedUser: req.params.userId })
      .populate('ratedUser')
      .populate('createdBy')
      .lean()
      .exec()
    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const createReview = async (req, res) => {
  const createdBy = req.user._id
  try {
    const doc = await Review.create({ ...req.body, createdBy })
    const allReviews = await Review.find({ ratedUser: req.body.ratedUser })
    const ratings = allReviews.map(item.rating)

    const ratedUser = await User.findOneAndUpdate(
      { _id: req.body.ratedUser },
      { avgRating: ratings.reduce((a, b) => a + b) / ratings.length }
    )

    res.status(201).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const updateReview = async (req, res) => {
  try {
    const updatedDoc = await Review.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      { new: true }
    )
      .lean()
      .exec()

    if (!updatedDoc) {
      return res.status(400).end()
    }

    res.status(200).json({ data: updatedDoc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export default crudControllers(Review)
