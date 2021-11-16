import { crudControllers } from '../../utils/crud'
import { Job } from '../job/job.model'
import { notifyUser } from '../notification/notification.controllers'
import { JobApp } from './jobApp.model'

export const updateJobApp = async (req, res) => {
  try {
    const status = req.body.status
    if (status === 'employed') {
      if (req.body.only) {
        await Job.findOneAndUpdate(
          { _id: req.body.jobId },
          { status: 'inactive' }
        )
      }

      notifyUser(
        {
          title: 'Employed',
          description: `Svaka cast bravo ti ga bravo`,
          reference: req.body.jobId,
        },
        req.body.createdBy._id
      )
    }
    if (status === 'not_employed') {
      await Job.findOneAndUpdate({ _id: req.body.jobId }, { status: 'active' })
      notifyUser(
        {
          title: 'not_employed',
          description: `Ne svaka cast, ne bravo ti ga bravo`,
          reference: req.body.jobId,
        },
        req.body.createdBy._id
      )
    }

    const updatedDoc = await JobApp.findOneAndUpdate(
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
export default crudControllers(JobApp)
