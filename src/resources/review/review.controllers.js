import { crudControllers } from '../../utils/crud'
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

export default crudControllers(Review)
