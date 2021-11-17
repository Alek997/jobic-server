import { Router } from 'express'
import controllers, { createCategory } from './category.controllers'

const router = Router()

// /api/item
router.route('/').get(controllers.getMany).post(createCategory)

// /api/item/all
router.route('/all').get(controllers.getAll)

// /api/item/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router
