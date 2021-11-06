import { Router } from 'express'
import controllers, { findByUser } from './review.controllers'

const router = Router()

// /api/item
router
  .route('/')
  .get(controllers.getMany)
  .post(controllers.createOne)
  .put(controllers.updateOne)

router.route('/findByUser/:userId').get(findByUser)

// /api/item/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router
