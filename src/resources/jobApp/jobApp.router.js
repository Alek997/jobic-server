import { Router } from 'express'
import controllers from './jobApp.controllers'
import { JobApp } from './jobApp.model'

const router = Router()

router.route('/').get(controllers.getMany).post(controllers.createOne)

router.route('/app/:id').get(async (req, res) => {
  try {
    const docs = await JobApp.find({ jobId: req.params.id }).lean().exec()

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
})

router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router
