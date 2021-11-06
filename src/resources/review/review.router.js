import { Router } from 'express'
import controllers, {
  createReview,
  findByUser,
  updateReview,
} from './review.controllers'

const router = Router()

// /api/item
router.route('/').post(createReview).put(updateReview)

router.route('/findByUser/:userId').get(findByUser)

// /api/item/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router
