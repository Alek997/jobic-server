import { Router } from 'express'
import { Job } from '../job/job.model'
import controllers from './jobApp.controllers'
import { JobApp } from './jobApp.model'

const router = Router()

router.route('/').get(controllers.getMany).post(controllers.createOne)

router.route('/app/:id').get(async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    })
      .lean()
      .exec()

    if (!job) {
      res.status(403).end()
    }

    const docs = await JobApp.find({
      jobId: req.params.id,
    })
      .populate('createdBy')
      .lean()
      .exec()

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
