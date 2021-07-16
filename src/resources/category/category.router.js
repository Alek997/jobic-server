import { Router } from 'express'
import controllers from './category.controllers'

const router = Router()

// /api/item
router.route('/').get(controllers.getMany).post(controllers.createOne)

// /api/item/all
router.route('/all').get(controllers.getAll)

// /api/item/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router
