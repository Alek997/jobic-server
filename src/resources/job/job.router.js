import { Router } from 'express'
import controllers, { filterJobs, findByUser } from './job.controllers'

const router = Router()

// /api/item
router.route('/').get(controllers.getMany).post(controllers.createOne)

// /api/item/all
router.route('/all').get(filterJobs)

router.route('/findByUser/:userId').get(findByUser)

// /api/item/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router
